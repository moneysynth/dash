"use client";

import { useState, useCallback, memo } from "react";
import { Save, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { saveCalculation, getCalculation } from "@/lib/storage";

interface SaveCalculationProps {
  calculatorType: string;
  calculationId: string;
  data: Record<string, unknown>;
}

function SaveCalculationComponent({
  calculatorType,
  calculationId,
  data,
}: SaveCalculationProps) {
  const key = `${calculatorType}_${calculationId}`;
  const existing = getCalculation(key);
  const [saved, setSaved] = useState(!!existing);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = useCallback(() => {
    setIsSaving(true);
    try {
      saveCalculation(key, {
        type: calculatorType,
        id: calculationId,
        ...data,
      });
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setIsSaving(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to save calculation:", error);
      setIsSaving(false);
    }
  }, [key, calculatorType, calculationId, data]);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSave}
      className="gap-2"
      disabled={saved || isSaving}
    >
      {isSaving ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : saved ? (
        <>
          <Check className="h-4 w-4" />
          Saved
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Save Calculation
        </>
      )}
    </Button>
  );
}

export const SaveCalculation = memo(SaveCalculationComponent);

