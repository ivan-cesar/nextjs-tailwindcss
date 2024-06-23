"use client";

import { Button } from "@/components/ui/button";
import { EnvelopeClosedIcon, ReloadIcon } from "@radix-ui/react-icons";
import { ChevronRightIcon } from "lucide-react";
export default function Page() {
    return(
        <div className="grid grid-cols-4 gap-2">
            <Button variant={"destructive"}>Destructive</Button>
            <Button variant={"ghost"}>Ghost</Button>
            <Button variant={'link'}>Link</Button>
            <Button variant={"secondary"}>Secondary</Button>
            <Button disabled>Disabled</Button>
            <Button onClick={() => alert("Hola Mundo")}>Click Me</Button>
            <Button variant={"success"}>Success</Button>
            <Button variant={"outline"} size={"icon"}>
                <ChevronRightIcon className="h-4 w-4"/>
            </Button>
            <Button>
                <EnvelopeClosedIcon className="mr-2 h-4 w-4"/>
                Login with Email
            </Button>
            <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                Please wait
            </Button>


        </div>
    )
}