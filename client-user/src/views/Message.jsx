import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { GiftedChat } from 'react-web-gifted-chat';
import { useCallback, useLayoutEffect, useState } from "react";import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import { ChatFeed, Message } from 'react-chat-ui'

const Messages = () => {
    const [messages, setMessages] = useState([])
    
  useLayoutEffect(()=>{
    const collectionRef = collection(database, 'bussiness1')
    const q = query(collectionRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({
        _id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      })))
    })
    return () => unsubscribe()
  },[])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const { _id, createdAt, text, user } = messages[0]
    addDoc(collection(database, 'bussiness1'), {
      _id,
      createdAt,
      text,
      user
    })
  })


    return (
        <div className="message w-full min-h-[100vh] flex justify-center">
            <div className="w-[60%] bg-gray-100 mt-10 rounded-lg flex flex-col shadow max-h-[80vh]">
                <div className="w-full rounded-t-lg px-6 py-2 bg-[#645CBB]">
                    <p className="text-white font-bold text-lg tracking-wide">Message</p>
                </div>
                <div className="flex h-full rounded-bl-lg">
                    <div className="w-[30%] bg-white h-full flex flex-col rounded-bl-lg">
                        <div className="border-b-2 w-full p-4 flex">
                            <input type="text" name="" id="" className="w-full border-[1px] px-2 focus:outline-none text-[13px] py-[4px] rounded-l" placeholder="search conversation"/>
                            <button className="p-2 bg-[#BFACE2] rounded-r-lg"><HiOutlineMagnifyingGlass className="text-white"/></button>
                        </div>
                        <button className=" flex items-center cursor-pointer w-full border-l-4 hover:border-[#BFACE2] focus:border-[#BFACE2] duration-200 border-white pt-2">
                            <div className="flex items-center px-4 py-2 border-b-2 w-full">
                                <img src="https://london.bridestory.com/images/c_fill,dpr_1.0,f_auto,fl_progressive,h_45,pg_1,q_80,w_45/v1/assets/LXY_2475_dnjwx5/easy-indonesia-wedding.webp" className="w-[40px] rounded-full" alt="" />
                                <p className="ml-4">sadsaad</p>
                            </div>
                        </button>
                    </div>
                    <div className="bg-blue-400 w-full h-full">

                    <GiftedChat  className="bg-red-400 w-32 h-96"
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
            avatar: "https://london.bridestory.com/images/c_fill,dpr_1.0,f_auto,fl_progressive,h_45,pg_1,q_80,w_45/v1/assets/LXY_2475_dnjwx5/easy-indonesia-wedding.webp"
          }}
          messagesContainerStyle={{
            backgroundColor: '#fff'
          }}
          bottomOffset={40}
        />

{/* <ChatFeed
      messages={this.state.messages} // Array: list of message objects
      isTyping={this.state.is_typing} // Boolean: is the recipient typing
      hasInputField={false} // Boolean: use our input, or use your own
      showSenderName // show the name of the user who sent the message
      bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
      // JSON: Custom bubble styles
      bubbleStyles={
        {
          text: {
            fontSize: 30
          },
          chatbubble: {
            borderRadius: 70,
            padding: 40
          }
        }
      }
    /> */}
                    </div>
                    {/* <div className="w-[70%] relative">
                        <div className="absolute w-full bottom-0 bg-white rounded-br-lg flex h-[9%]">
                            <input type="text" name="" id="" className="w-[90%] py-[15px] text-sm px-4 focus:outline-none" placeholder="write your message here"/>
                            <button className="w-[10%] flex items-center justify-center bg-[#645CBB] p-2 rounded-br-lg">
                                <RiSendPlaneFill className="w-full text-2xl text-white"/>
                            </button>
                        </div>
                        <div className="h-[91%] px-4 pt-2">
                            sasadsadssa
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Messages;

