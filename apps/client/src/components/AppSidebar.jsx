import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronsUpDown,
  Copy,
  Ellipsis,
  File,
  Home,
  Info,
  Loader2,
  LogOut,
  Moon,
  Plus,
  Settings,
  Sun,
  SunMoon,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";
import useCreateNote from "../hooks/useCreateNode";
import useNoteList from "../hooks/useNoteList";
import authApi from "../lib/axios/authApi";
import privateApi from "../lib/axios/privateApi";
import { useAuthStore } from "../lib/useAuthStore";
import useNotesStore from "../lib/useNotesStore";
import { generateUniqueTitle } from "../lib/utils";
import { useTheme } from "./themeProvider";
import { Button } from "./ui/button";

const Logo = () => {
  const { state } = useSidebar();
  return state === "expanded" && <h1 className="text-lg font-bold">Notiz</h1>;
};

const logoutService = async () => {
  const res = await authApi.post("/logout");
  return res.data;
};

const LogoutDialog = ({ ...props }) => {
  const { setToken, setUser } = useAuthStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setToken: state.setToken,
    })),
  );

  const setNotes = useNotesStore((state) => state.setNotes);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutService();
    setUser(null);
    setToken(null);
    setNotes([]);
    navigate("/");
  };
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log out of your account?</AlertDialogTitle>
          <AlertDialogDescription>
            You’ll need to sign in again to continue using the app.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogCancel className="mt-4">Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleLogout}>Log out</AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const SidebarMenuList = () => {
  const menuConfig = [{ to: "/home", Icon: Home, displayedName: "Home" }];

  return menuConfig.map(({ to, Icon, displayedName }) => (
    <SidebarMenuItem key={displayedName}>
      <SidebarMenuButton asChild tooltip={displayedName}>
        <Link to={to}>
          <Icon /> {displayedName}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ));
};

const UserProfile = ({ ...props }) => {
  const user = useAuthStore((state) => state.user);

  if (!useAuthStore.persist.hasHydrated()) {
    return (
      <div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-1 w-full">
        <Skeleton className="size-10 aspect-square rounded-full row-span-2" />
        <Skeleton className="w-full" />
        <Skeleton className="w-4/5 col-start-2" />
      </div>
    );
  }

  if (user)
    return (
      <SidebarMenuButton
        {...props}
        size="lg"
        className="group-data-[collapsible=icon]:size-10!"
      >
        <Avatar size="lg">
          <AvatarImage alt={user?.["username"][0]} className="grayscale" />
          <AvatarFallback>{user?.["username"][0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <p className="truncate font-semibold">{user?.["username"]}</p>
          <p className="truncate text-muted-foreground text-xs">
            {user?.email}
          </p>
        </div>

        <ChevronsUpDown className="ml-auto size-4 opacity-50" />
      </SidebarMenuButton>
    );
};

const ThemeDropdown = () => {
  const { setTheme } = useTheme();
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <SunMoon />
        Theme
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Settings />
            System
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

const DropDownAvatar = () => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <UserProfile />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <ThemeDropdown />
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setIsLogoutOpen(true)}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutDialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen} />
    </>
  );
};

const DropDownFooter = () => {
  const token = useAuthStore((state) => state.token);

  return token ? (
    <DropDownAvatar />
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size="lg">
          <Ellipsis className="ms-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <ThemeDropdown />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const NoteOptions = ({ id, setIsDuplicating }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [openNoteDetailDialog, setOpenNoteDetailDialog] = useState(false);
  const [openRemoveNoteDialog, setOpenRemoveNoteDialog] = useState(false);
  const { getNote, notes, addNote } = useNotesStore(
    useShallow((state) => ({
      getNote: state.getNote,
      notes: state.notes,
      addNote: state.addNote,
    })),
  );
  const navigate = useNavigate();
  const [noteInformation, setNoteInformation] = useState({});
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const handleOpenInformationDialog = () => {
    setOpenNoteDetailDialog(true);
    const rawNote = useNotesStore.getState().getNote(id);

    const formattedNote = {
      ...rawNote,
      created_at: new Date(rawNote["created_at"]).toLocaleString(),
      updated_at: new Date(rawNote["updated_at"]).toLocaleString(),
    };

    setNoteInformation(formattedNote);
  };

  const handleDeleteNote = async (e) => {
    e.preventDefault();

    setIsDeleting(true);

    try {
      const res = await privateApi.delete(`/notes/${id}`);
      const { id: noteId } = res.data["data"];
      deleteNote(noteId);
      setOpenRemoveNoteDialog(false);

      const remainingNotes = useNotesStore.getState().notes;

      const existingNotes = remainingNotes.filter((n) => n.id !== id);
      if (existingNotes.length === 0) {
        navigate("/home", { replace: true });
      } else {
        navigate(`/notes/${existingNotes[0].id}`, { replace: true });
      }
    } catch {
      toast.error("Failed to delete note", {
        description: "Please try again later",
      });
      setOpenRemoveNoteDialog(true);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDuplicateNote = async () => {
    setIsDuplicating(true);
    try {
      const { title, content } = useNotesStore.getState().getNote(id);
      const newTitle = generateUniqueTitle(notes, title);
      const res = await privateApi.post("/notes", {
        title: newTitle,
        content,
      });
      const { content: noteContent, id: noteId, ...props } = res.data["data"];
      addNote({ id: noteId, ...props });
      navigate(`/notes/${id}`, { replace: true });
    } catch (err) {
      toast.error("Failed to duplicate note", {
        description: "Please try again later",
      });
      console.error(err);
    } finally {
      setIsDuplicating(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="size-auto rounded-sm ms-auto"
            size="icon-lg"
          >
            <Ellipsis className="ms-auto" />
            <span className="sr-only">note options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleOpenInformationDialog}>
            <Info />
            information
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onSelect={setOpenRemoveNoteDialog}
          >
            <Trash />
            remove
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleDuplicateNote}>
            <Copy />
            duplicate
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={openNoteDetailDialog}
        onOpenChange={setOpenNoteDetailDialog}
      >
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Information</DialogTitle>
            <DialogDescription className="sr-only">
              Note information
            </DialogDescription>
            <div className="flex flex-col gap">
              {Object.entries(noteInformation).map(([key, value]) => {
                if (key === "content" || key === "id") return;
                return (
                  <div key={key} className="flex gap-2">
                    <span className="font-medium">
                      {key.replaceAll("_", " ")}:
                    </span>
                    <span className="text-muted-foreground">
                      {String(value)}
                    </span>
                  </div>
                );
              })}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={openRemoveNoteDialog}
        onOpenChange={setOpenRemoveNoteDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to remove {getNote(id)?.title}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel className="mt-4">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteNote} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <Loader2 className="animate-spin" />
                Removing...
              </>
            ) : (
              "Remove"
            )}
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

const NoteList = (props) => {
  const { notes } = useNotesStore(
    useShallow((state) => ({
      notes: state.notes,
    })),
  );

  const { isLoading: isCreating, handleCreateNote } = useCreateNote();

  const { isLoading: isInitializing } = useNoteList();
  const [isDuplicating, setIsDuplicating] = useState(false);
  const navigate = useNavigate();

  const { id: noteId } = useParams();

  const token = useAuthStore((state) => state.token);

  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel>My notes</SidebarGroupLabel>
      <SidebarGroupAction asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="w-auto h-auto rounded-sm"
          onClick={token ? handleCreateNote : () => navigate("/login")}
          disabled={isCreating || isInitializing}
        >
          <Plus /> <span className="sr-only">Add notes</span>
        </Button>
      </SidebarGroupAction>
      <SidebarGroupContent>
        {isCreating || isInitializing || isDuplicating
          ? Array.from({ length: 5 }).map((_, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuSkeleton />
              </SidebarMenuItem>
            ))
          : notes.map((note) => (
              <SidebarMenuItem key={note.id}>
                <SidebarMenuButton
                  asChild
                  isActive={noteId === note.id}
                  tooltip={note.title}
                >
                  <div>
                    <Link
                      to={`/notes/${note.id}`}
                      className="flex-1 flex gap-2"
                    >
                      <File /> <p className="truncate">{note.title}</p>{" "}
                    </Link>
                    <NoteOptions
                      id={note.id}
                      setIsDuplicating={setIsDuplicating}
                    />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-between items-center">
            <Logo />
            <SidebarTrigger />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuList />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NoteList />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropDownFooter />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
