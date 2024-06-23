import ChatWindow from "@/components/chat/ChatWindow";
import MessageList from "@/components/chat/MessageList";

export default function Page() {
    return(
<div className="flex min-h-screen">
      <MessageList />
      <ChatWindow />
    </div>
    )
}