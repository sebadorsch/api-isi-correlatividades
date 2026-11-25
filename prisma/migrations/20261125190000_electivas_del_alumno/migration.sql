-- AlterTable
ALTER TABLE "User" ADD COLUMN     "electives" JSONB NOT NULL DEFAULT '[]';

-- Las horas que cada alumno ya tenía cargadas pasan a una electiva "sin detallar" por nivel, aprobada.
UPDATE "User" u
SET "electives" = COALESCE((
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', 'migrada-' || v.level,
      'name', 'Electivas sin detallar',
      'level', v.level,
      'hours', v.hours,
      'state', 'aprobada'
    ) ORDER BY v.level
  )
  FROM (VALUES (3, u."electiveHoursLevel3"), (4, u."electiveHoursLevel4"), (5, u."electiveHoursLevel5")) AS v(level, hours)
  WHERE v.hours > 0
), '[]'::jsonb);
