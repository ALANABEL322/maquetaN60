import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  startDate: string;
  endDate: string;
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
  startDate: Date | undefined;
  endDate: Date | undefined;
  objectives: string;
  productOwner: string;
  scrumMaster: string;
  teamId: string;
}

interface ProjectStore {
  teams: Team[];
  currentProject: ProjectForm;
  reinforcements: Member[];
  projects: Project[];
  createProject: (project: Partial<ProjectForm>) => void;
  submitProject: () => void;
  resetProject: () => void;
  getTeamById: (id: string) => Team | undefined;
  deleteProject: (id: string) => void;
  addReinforcement: (member: Omit<Member, "id">) => void;
  removeReinforcement: (memberId: string) => void;
}

// const initialReinforcements: Member[] = [
//   {
//     id: "r1",
//     firstName: "Refuerzo",
//     lastName: "Uno",
//     email: "refuerzo1@example.com",
//     photo: "https://i.pravatar.cc/300?img=60",
//   },
//   {
//     id: "r2",
//     firstName: "Refuerzo",
//     lastName: "Dos",
//     email: "refuerzo2@example.com",
//     photo: "https://i.pravatar.cc/300?img=61",
//   },
// ];

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
        photo:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },
      {
        id: "m2",
        firstName: "María",
        lastName: "Gómez",
        email: "maria.gomez@example.com",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      },
      {
        id: "m3",
        firstName: "Carlos",
        lastName: "López",
        email: "carlos.lopez@example.com",
        photo: "https://i.pravatar.cc/300?img=5",
      },
      {
        id: "m4",
        firstName: "Ana",
        lastName: "Martínez",
        email: "ana.martinez@example.com",
        photo: "https://randomuser.me/api/portraits/women/43.jpg ",
      },
      {
        id: "m5",
        firstName: "Luis",
        lastName: "Rodríguez",
        email: "luis.rodriguez@example.com",
        photo: "https://avataaars.io/?avatarStyle=Circle",
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
        photo: "https://robohash.org/avatar123",
      },
      {
        id: "m7",
        firstName: "Laura",
        lastName: "Fernández",
        email: "laura.fernandez@example.com",
        photo: "https://api.dicebear.com/7.x/lorelei/svg?seed=1&radius=50",
      },
      {
        id: "m8",
        firstName: "Diego",
        lastName: "García",
        email: "diego.garcia@example.com",
        photo: "https://i.pravatar.cc/300?img=20",
      },
      {
        id: "m9",
        firstName: "Sofía",
        lastName: "Díaz",
        email: "sofia.diaz@example.com",
        photo: "https://i.pravatar.cc/300?u=1",
      },
      {
        id: "m10",
        firstName: "Javier",
        lastName: "Ruiz",
        email: "javier.ruiz@example.com",
        photo: "https://randomuser.me/api/portraits/thumb/men/3.jpg",
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
        photo: "https://avataaars.io/?avatarStyle=Circle",
      },
      {
        id: "m12",
        firstName: "Miguel",
        lastName: "Jiménez",
        email: "miguel.jimenez@example.com",
        photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
      },
      {
        id: "m13",
        firstName: "Isabel",
        lastName: "Moreno",
        email: "isabel.moreno@example.com",
        photo: "https://api.dicebear.com/7.x/bottts/svg?seed=1",
      },
      {
        id: "m14",
        firstName: "Pablo",
        lastName: "Álvarez",
        email: "pablo.alvarez@example.com",
        photo: "https://api.dicebear.com/7.x/identicon/svg?seed=1",
      },
      {
        id: "m15",
        firstName: "Teresa",
        lastName: "Romero",
        email: "teresa.romero@example.com",
        photo: "https://api.dicebear.com/7.x/lorelei/svg?seed=1&radius=50",
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
        photo:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=faces&fit=crop&w=200&h=200",
      },
      {
        id: "m17",
        firstName: "Carmen",
        lastName: "Navarro",
        email: "carmen.navarro@example.com",
        photo: "https://randomuser.me/api/portraits/women/20.jpg",
      },
      {
        id: "m18",
        firstName: "Óscar",
        lastName: "Morales",
        email: "oscar.morales@example.com",
        photo: "https://thispersondoesnotexist.com",
      },
      {
        id: "m19",
        firstName: "Patricia",
        lastName: "Ortega",
        email: "patricia.ortega@example.com",
        photo: "https://i.pravatar.cc/300?u=1",
      },
      {
        id: "m20",
        firstName: "Alberto",
        lastName: "Delgado",
        email: "alberto.delgado@example.com",
        photo:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
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

export const useCreateProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      teams: initialTeams,
      reinforcements: [],
      currentProject: initialProjectForm,
      projects: [],

      createProject: (project) =>
        set((state) => ({
          currentProject: { ...state.currentProject, ...project },
        })),

      submitProject: () => {
        const { currentProject } = get();

        if (
          !currentProject.title ||
          !currentProject.teamId ||
          !currentProject.startDate ||
          !currentProject.endDate ||
          !currentProject.priority ||
          !["alta", "media", "baja"].includes(currentProject.priority)
        ) {
          console.error("Faltan campos requeridos o prioridad no válida");
          return;
        }

        const newProject: Project = {
          ...currentProject,
          priority: currentProject.priority as PriorityLevel,
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

      // Nueva función para eliminar proyectos
      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        }));
      },

      // Nuevas funciones para manejar refuerzos
      addReinforcement: (member) => {
        if (get().reinforcements.length >= 10) {
          console.error("No se pueden añadir más de 10 refuerzos");
          return;
        }
        set((state) => ({
          reinforcements: [
            ...state.reinforcements,
            {
              ...member,
              id: `reinforcement-${Date.now()}`,
            },
          ],
        }));
      },

      removeReinforcement: (memberId) => {
        set((state) => ({
          reinforcements: state.reinforcements.filter(
            (member) => member.id !== memberId
          ),
        }));
      },
    }),

    {
      name: "project-storage", // nombre único para el localStorage
      partialize: (state) => ({
        projects: state.projects,
        reinforcements: state.reinforcements,
        // Puedes incluir otros estados que quieras persistir
        // currentProject: state.currentProject,
      }),
    }
  )
);
