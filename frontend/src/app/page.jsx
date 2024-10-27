import List from "@/components/List";
import ShoppingSpot from "@/components/pull-up";
import StickyNote from "@/components/ui/stickyNotes";
import { cookies } from 'next/headers'
export default async function Home() {
  const cookieStore = await cookies()
  const user = JSON.parse(cookieStore.get('user').value)
  console.log(user.username)
  return (
    <div>
      <main className="bg-white h-screen items-center flex flex-col pt-20">
        <List />
        
      </main>
      <div className="flex flex-row justify-center pb-3 mb-3">
      <StickyNote/>
      </div>
      <div className="mt-5 pt-5">
        <ShoppingSpot/> 
      </div>
    </div>
    
    
  );
}