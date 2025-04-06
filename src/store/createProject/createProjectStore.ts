import { create } from "zustand";

type Member = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
};

type Team = {
  id: string;
  name: string;
  members: Member[];
};

type Project = {
  id: string;
  title: string;
  description: string;
  priority: PriorityLevel;
  startDate: string; // ISO string
  endDate: string; // ISO string
  objectives: string;
  productOwner: string;
  scrumMaster: string;
  teamId: string;
  createdAt: string;
};

type PriorityLevel = "alta" | "media" | "baja";

interface ProjectForm {
  title: string;
  description: string;
  priority: PriorityLevel | "";
  startDate: Date | undefined; // Date durante la edición
  endDate: Date | undefined; // Date durante la edición
  objectives: string;
  productOwner: string;
  scrumMaster: string;
  teamId: string;
}

interface ProjectStore {
  teams: Team[];
  currentProject: ProjectForm;
  projects: Project[];
  createProject: (project: Partial<ProjectForm>) => void;
  submitProject: () => void;
  resetProject: () => void;
  getTeamById: (id: string) => Team | undefined;
}
const initialTeams: Team[] = [
  {
    id: "team1",
    name: "Equipo Frontend",
    members: [
      {
        id: "m1",
        firstName: "Juan",
        lastName: "Pérez",
        email: "juan.perez@example.com",
        photo: "/avatars/1.jpg",
      },
      {
        id: "m2",
        firstName: "María",
        lastName: "Gómez",
        email: "maria.gomez@example.com",
        photo: "/avatars/2.jpg",
      },
      {
        id: "m3",
        firstName: "Carlos",
        lastName: "López",
        email: "carlos.lopez@example.com",
        photo: "/avatars/3.jpg",
      },
      {
        id: "m4",
        firstName: "Ana",
        lastName: "Martínez",
        email: "ana.martinez@example.com",
        photo: "/avatars/4.jpg",
      },
      {
        id: "m5",
        firstName: "Luis",
        lastName: "Rodríguez",
        email: "luis.rodriguez@example.com",
        photo: "/avatars/5.jpg",
      },
    ],
  },
  {
    id: "team2",
    name: "Equipo Backend",
    members: [
      {
        id: "m6",
        firstName: "Pedro",
        lastName: "Sánchez",
        email: "pedro.sanchez@example.com",
        photo: "/avatars/6.jpg",
      },
      {
        id: "m7",
        firstName: "Laura",
        lastName: "Fernández",
        email: "laura.fernandez@example.com",
        photo: "/avatars/7.jpg",
      },
      {
        id: "m8",
        firstName: "Diego",
        lastName: "García",
        email: "diego.garcia@example.com",
        photo: "/avatars/8.jpg",
      },
      {
        id: "m9",
        firstName: "Sofía",
        lastName: "Díaz",
        email: "sofia.diaz@example.com",
        photo: "/avatars/9.jpg",
      },
      {
        id: "m10",
        firstName: "Javier",
        lastName: "Ruiz",
        email: "javier.ruiz@example.com",
        photo: "/avatars/10.jpg",
      },
    ],
  },
  {
    id: "team3",
    name: "Equipo QA",
    members: [
      {
        id: "m11",
        firstName: "Elena",
        lastName: "Hernández",
        email: "elena.hernandez@example.com",
        photo: "/avatars/11.jpg",
      },
      {
        id: "m12",
        firstName: "Miguel",
        lastName: "Jiménez",
        email: "miguel.jimenez@example.com",
        photo: "/avatars/12.jpg",
      },
      {
        id: "m13",
        firstName: "Isabel",
        lastName: "Moreno",
        email: "isabel.moreno@example.com",
        photo: "/avatars/13.jpg",
      },
      {
        id: "m14",
        firstName: "Pablo",
        lastName: "Álvarez",
        email: "pablo.alvarez@example.com",
        photo: "/avatars/14.jpg",
      },
      {
        id: "m15",
        firstName: "Teresa",
        lastName: "Romero",
        email: "teresa.romero@example.com",
        photo: "/avatars/15.jpg",
      },
    ],
  },
  {
    id: "team4",
    name: "Equipo DevOps",
    members: [
      {
        id: "m16",
        firstName: "Raúl",
        lastName: "Torres",
        email: "raul.torres@example.com",
        photo: "/avatars/16.jpg",
      },
      {
        id: "m17",
        firstName: "Carmen",
        lastName: "Navarro",
        email: "carmen.navarro@example.com",
        photo: "/avatars/17.jpg",
      },
      {
        id: "m18",
        firstName: "Óscar",
        lastName: "Morales",
        email: "oscar.morales@example.com",
        photo: "/avatars/18.jpg",
      },
      {
        id: "m19",
        firstName: "Patricia",
        lastName: "Ortega",
        email: "patricia.ortega@example.com",
        photo: "/avatars/19.jpg",
      },
      {
        id: "m20",
        firstName: "Alberto",
        lastName: "Delgado",
        email: "alberto.delgado@example.com",
        photo: "/avatars/20.jpg",
      },
    ],
  },
];

const initialProjectForm: ProjectForm = {
  title: "",
  description: "",
  priority: "",
  startDate: undefined,
  endDate: undefined,
  objectives: "",
  productOwner: "",
  scrumMaster: "",
  teamId: "",
};

export const useCreateProjectStore = create<ProjectStore>((set, get) => ({
  teams: initialTeams,
  currentProject: initialProjectForm,
  projects: [],

  createProject: (project) =>
    set((state) => ({
      currentProject: { ...state.currentProject, ...project },
    })),

  submitProject: () => {
    const { currentProject } = get();

    // Validación de campos requeridos
    if (
      !currentProject.title ||
      !currentProject.teamId ||
      !currentProject.startDate ||
      !currentProject.endDate ||
      !currentProject.priority || // Asegura que priority no esté vacío
      !["alta", "media", "baja"].includes(currentProject.priority) // Validación explícita
    ) {
      console.error("Faltan campos requeridos o prioridad no válida");
      return;
    }

    // Crear nuevo proyecto con prioridad validada
    const newProject: Project = {
      ...currentProject,
      priority: currentProject.priority as PriorityLevel, // Conversión segura
      id: `proj-${Date.now()}`,
      startDate: currentProject.startDate.toISOString(),
      endDate: currentProject.endDate.toISOString(),
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      projects: [...state.projects, newProject],
      currentProject: initialProjectForm,
    }));
  },

  resetProject: () => set({ currentProject: initialProjectForm }),

  getTeamById: (id) => get().teams.find((team) => team.id === id),
}));
