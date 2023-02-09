import NavbarChat from "./NavbarChat"
import SearchChat from "./SearchChat"
import Chats from "./Chats"
function Sidebar(){
    return (
        <div className="sidebar">
            <NavbarChat/>
            <SearchChat/>
            <Chats/>
        </div>
    )
}
export default Sidebar