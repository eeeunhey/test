import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import ChecklistItem from "../components/forms/ChecklistItem";
import { getCalibration, saveCalibration, startSession } from "../api/aiInterview";

const CHECKS = [
  { id: "framing",     label: "눈/가에 카메라 프레이밍 정렬" },
  { id: "focus",       label: "시선 정면 유지 (카메라 응시)" },
  { id: "noiseReduce", label: "상대 잡음 조정 · 불필요 최소화" },
  { id: "lighting",    label: "배경 정리 · 조명 준비" },
];

const Calibration = () => {
  const [notes, setNotes] = useState("");
  const [checks, setChecks] = useState({
    framing:false, focus:false, noiseReduce:false, lighting:false
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [starting, setStarting] = useState(false);
  const allDone = useMemo(
    () => Object.values(checks).every(Boolean),
    [checks]
  );

  // 최초 로드: 서버 값 불러오기
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await getCalibration();
        if (data?.notes) setNotes(data.notes);
        if (data?.checklist) setChecks((prev) => ({ ...prev, ...data.checklist }));
      } catch (e) {
        // 초기값 없으면 무시
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateCheck = (id, value) =>
    setChecks((prev) => ({ ...prev, [id]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveCalibration({ notes, checklist: checks });
    } finally {
      setSaving(false);
    }
  };

  const handleStart = async () => {
    setStarting(true);
    try {
      // 1) 저장
      await saveCalibration({ notes, checklist: checks });
      // 2) 세션 시작
      const { data } = await startSession({ calibrationOk: allDone });
      // 3) 라우팅 (또는 상위에서 navigate)
      if (data?.startUrl) window.location.href = data.startUrl;
    } catch (e) {
      alert("시작 중 오류가 발생했습니다.");
    } finally {
      setStarting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 좌: 캘리브레이션 메모 */}
          <Card className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">캘리브레이션</h2>
            <textarea
              className="w-full h-72 rounded-xl border p-4 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="카메라 프레이밍 가이드는 눈/가에 걸치게 맞추세요"
              value={notes}
              onChange={(e)=>setNotes(e.target.value)}
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={handleSave} disabled={saving || loading}>
                {saving ? "저장 중..." : "저장"}
              </Button>
            </div>
          </Card>

          {/* 우: 체크리스트 + 시작 */}
          <div className="space-y-6">
            <Card>
              <h3 className="text-sm font-semibold mb-4">체크리스트</h3>
              <div className="space-y-3">
                {CHECKS.map((c)=>(
                  <ChecklistItem
                    key={c.id}
                    id={c.id}
                    label={c.label}
                    checked={!!checks[c.id]}
                    onChange={updateCheck}
                  />
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold mb-1">완료 준비</h3>
              <p className="text-xs text-gray-500 mb-4">
                프레이밍과 음성 체크를 마치면 면접을 시작하세요.
              </p>
              <Button
                className="w-full"
                onClick={handleStart}
                disabled={!allDone || starting || loading}
                title={!allDone ? "체크리스트를 모두 완료하세요" : ""}
              >
                {starting ? "시작 중..." : "면접 시작"}
              </Button>
            </Card>
          </div>
        </div>

        {/* 푸터 느낌 */}
        <div className="text-[11px] text-gray-400 mt-16 flex justify-between">
          <span>© 2025 AI 면접 코치. All rights reserved.</span>
          <span>문의: support@example.com</span>
        </div>
      </div>
    </div>
  );
};

export default Calibration;
