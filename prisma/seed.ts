import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

const subjects: Prisma.SubjectCreateInput[] = [
  { name: "Análisis Matemático I", code: 1, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 1, requiredSubjectsToEnroll: [], requiredSubjectsToPass: [] },
  { name: "Álgebra y Geometría Analítica", code: 2, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 1, requiredSubjectsToEnroll: [], requiredSubjectsToPass: [] },
  { name: "Física I", code: 3, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 1, requiredSubjectsToEnroll: [], requiredSubjectsToPass: [] },
  { name: "Inglés I", code: 4, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 1, requiredSubjectsToEnroll: [], requiredSubjectsToPass: [] },
  { name: "Lógica y Estructuras Discretas", code: 5, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 1, requiredSubjectsToEnroll: [], requiredSubjectsToPass: [] },
  { name: "Algoritmos y Estructuras de Datos", code: 6, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 1, requiredSubjectsToEnroll: [], requiredSubjectsToPass: [] },
  { name: "Arquitectura de Computadoras", code: 7, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 1, requiredSubjectsToEnroll: [], requiredSubjectsToPass: [] },
  { name: "Sistemas y Organizaciones", code: 8, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 1, requiredSubjectsToEnroll: [], requiredSubjectsToPass: [] },

  { name: "Análisis Matemático II", code: 9, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 2, requiredSubjectsToEnroll: [1, 2], requiredSubjectsToPass: [] },
  { name: "Física II", code: 10, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 2, requiredSubjectsToEnroll: [1, 3], requiredSubjectsToPass: [] },
  { name: "Ingeniería y Sociedad", code: 11, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 2, requiredSubjectsToEnroll: [], requiredSubjectsToPass: [] },
  { name: "Inglés II", code: 12, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 2, requiredSubjectsToEnroll: [4], requiredSubjectsToPass: [] },
  { name: "Sintaxis y Semántica de los Lenguajes", code: 13, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 2, requiredSubjectsToEnroll: [5, 6], requiredSubjectsToPass: [] },
  { name: "Paradigmas de Programación", code: 14, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 2, requiredSubjectsToEnroll: [5, 6], requiredSubjectsToPass: [] },
  { name: "Sistemas Operativos", code: 15, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 2, requiredSubjectsToEnroll: [7], requiredSubjectsToPass: [] },
  { name: "Análisis de Sistemas", code: 16, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 2, requiredSubjectsToEnroll: [6, 8], requiredSubjectsToPass: [] },

  { name: "Probabilidades y Estadística", code: 17, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 3, requiredSubjectsToEnroll: [1, 2], requiredSubjectsToPass: [] },
  { name: "Economía", code: 18, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 3, requiredSubjectsToEnroll: [], requiredSubjectsToPass: [1, 2] },
  { name: "Bases de Datos", code: 19, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 3, requiredSubjectsToEnroll: [13, 16], requiredSubjectsToPass: [5, 6] },
  { name: "Desarrollo de Software", code: 20, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 3, requiredSubjectsToEnroll: [14, 16], requiredSubjectsToPass: [5, 6] },
  { name: "Comunicaciones", code: 21, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 3, requiredSubjectsToEnroll: [], requiredSubjectsToPass: [3, 7] },
  { name: "Análisis Numérico", code: 22, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 3, requiredSubjectsToEnroll: [9], requiredSubjectsToPass: [1, 2] },
  { name: "Diseño de Sistemas", code: 23, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 3, requiredSubjectsToEnroll: [14, 16], requiredSubjectsToPass: [4, 6, 8] },

  { name: "Legislación", code: 24, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 4, requiredSubjectsToEnroll: [11], requiredSubjectsToPass: [] },
  { name: "Ingeniería de Software", code: 25, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 4, requiredSubjectsToEnroll: [19, 20, 23], requiredSubjectsToPass: [13, 14] },
  { name: "Redes de Datos", code: 26, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 4, requiredSubjectsToEnroll: [15, 21], requiredSubjectsToPass: [] },
  { name: "Investigación Operativa", code: 27, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 4, requiredSubjectsToEnroll: [17, 22], requiredSubjectsToPass: [] },
  { name: "Simulación", code: 28, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 4, requiredSubjectsToEnroll: [17], requiredSubjectsToPass: [9] },
  { name: "Tecnologías de Automatización", code: 29, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 4, requiredSubjectsToEnroll: [10, 22], requiredSubjectsToPass: [9] },
  { name: "Administración de Recursos", code: 30, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 4, requiredSubjectsToEnroll: [18, 23], requiredSubjectsToPass: [16] },

  { name: "Inteligencia Artificial", code: 31, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 5, requiredSubjectsToEnroll: [28], requiredSubjectsToPass: [17, 22] },
  { name: "Ciencia de Datos", code: 32, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 5, requiredSubjectsToEnroll: [28], requiredSubjectsToPass: [17, 19] },
  { name: "Sistemas de Gestión", code: 33, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 5, requiredSubjectsToEnroll: [18, 27], requiredSubjectsToPass: [23] },
  { name: "Gestión Gerencial", code: 34, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 5, requiredSubjectsToEnroll: [24, 30], requiredSubjectsToPass: [18] },
  { name: "Seguridad Informática", code: 35, termType: 'ANUAL', totalHours: 0, annualHours: 0, weeklyHours: 0, courseYear: 5, requiredSubjectsToEnroll: [21, 23], requiredSubjectsToPass: [16] },
];

async function main() {
  for (const subject of subjects) {
    await prisma.subject.create({ data: subject });
  }
}

main()
  .then(() => {
    console.log("Materias insertadas correctamente");
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
