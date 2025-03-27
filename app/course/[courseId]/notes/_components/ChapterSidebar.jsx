import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function ChapterSidebar({ notes, activeChapter, setActiveChapter }) {
  return (
    <>
      {/* Mobile Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden absolute top-4 left-1">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[240px] sm:w-[300px]">
          <SheetHeader>
            <SheetTitle>Chapters</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 mt-4">
            {notes.map((note) => (
              <Button
                key={note.id}
                variant={activeChapter?.id === note.id ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveChapter(note)}>
                Chapter {note.chapterId}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen w-[240px] flex-col gap-2 border-r p-4 fixed left-0 top-0">
        <h2 className="font-semibold mb-2">Chapters</h2>
        {notes.map((note) => (
          <Button
            key={note.id}
            variant={activeChapter?.id === note.id ? "default" : "ghost"}
            className="justify-start"
            onClick={() => setActiveChapter(note)}>
            Chapter {note.chapterId}
          </Button>
        ))}
      </div>
    </>
  );
}
