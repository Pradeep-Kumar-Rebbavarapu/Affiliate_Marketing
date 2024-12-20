import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import { cookies } from 'next/headers';


interface ListItem {
  id : number;
  title : string;
  description : string;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 

  const cookieStore = await cookies()
  const token = cookieStore.get('access')?.value
  let initialLists : ListItem[] = []

  async function fetchUserLists(token: string): Promise<ListItem[]> {
      try{
          const response = await fetch('http://127.0.0.1:8000/api/v1/lists/' , {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
              cache: 'no-store',
          });

          if (!response.ok) {
              console.error(`Response status: ${response.status} ${response.statusText}`);
              throw new Error('Failed to fetch the lists');
          }

          const data = await response.json();
          // console.log('Fetched data:', data);
          return data;

      }catch(error){
          console.error('Error Fetching the User Lists : ' , error);
          throw error;
      }
  }

  if(token){
    try{
      initialLists = await fetchUserLists(token)
    }catch(error){
      console.error('Error fetching initial lists : ', error)
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar token = {token} initialLists = {initialLists} />
        {children}
      </body>
    </html>
  );
}
