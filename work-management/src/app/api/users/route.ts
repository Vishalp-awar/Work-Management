import connectDb from "@/app/helper/db";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";

export async function GET(request:NextRequest){

    const name = request.nextUrl.searchParams.get('name'); 

        if(name){
            try{
                await connectDb();

                const data= await User.findOne({name : name});

                return NextResponse.json(data)

            }catch(error){

                console.log(error);
            }
        }else{

             const data = await User.find();

             return NextResponse.json(data);
        }

}


export async function POST(request: NextRequest) {
    try {
    
      await connectDb();
  
      
      const { name, email, password, about, profileUrl } = await request.json();
  
      
      console.log(name, email, password, about, profileUrl);
  
   
      const user = new User({ name, email, password, about, profileUrl });
  
      
      await user.save();
  
   
      return NextResponse.json({ message: "User is created" }, { status: 201 });
    } catch (error) {
      
      console.log("Error in creating user:", error);
  
      
      return NextResponse.json({ error: "Error in creating user" }, { status: 500 });
    }
  }

export async function DELETE(request:NextRequest)
{
    const name = request.nextUrl.searchParams.get('name'); 

        if(name){
                 try{
                    await connectDb();
                    const user = await User.findOneAndDelete({name : name});
                    return NextResponse.json({message:"User is deleted"},{status:200})
                 }catch(error){
                    console.log(error);
                    return NextResponse.json({error:"Error in deleting user"},{status:500})
                 }
                }
                else{
                    return NextResponse.json({error:"Name is required"},{status:400})
                    }
                        
}

export async function PUT(request:NextRequest){
    const name = request.nextUrl.searchParams.get('name');
    if(name){
        try{
            await connectDb();
            const user = await User.findOneAndUpdate({name:name},request.json())
            return NextResponse.json({message:"User is updated"},{status:200})
            }
            catch(error){
                console.log(error);
                return NextResponse.json({error:"Error in updating user"},{status:500})
                }
    }else{
        return NextResponse.json({error:"Name is required"},{status:400})   
        }
   
 }
