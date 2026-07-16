import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Watchlist } from "@/lib/models/watchlist";


// Add item to watchlist
export async function POST(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {

    const session = await getAuthSession();


    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }


    const { id } = await params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          error: "Invalid watchlist id",
        },
        {
          status: 400,
        }
      );
    }


    const {
      name,
      movieId,
      releaseDate,
      imageUrl,
      moviebackdrop_path,
    } = await req.json();


    if (!movieId || !name) {
      return NextResponse.json(
        {
          error: "Movie information is required",
        },
        {
          status:400,
        }
      );
    }


    await connectDB();


    const watchlist = await Watchlist.findOne({
      _id: id,
      user: session.user.id,
    });


    if (!watchlist) {
      return NextResponse.json(
        {
          error:"Watchlist not found",
        },
        {
          status:404,
        }
      );
    }


    const alreadyExists =
      watchlist.items.some(
        (item: { movieId: any; }) => item.movieId === movieId
      );


    if (alreadyExists) {
      return NextResponse.json(
        {
          error:"Movie already exists in the watchlist",
        },
        {
          status:400,
        }
      );
    }


    watchlist.items.push({
      name,
      movieId,
      releaseDate,
      imageUrl,
      moviebackdrop_path,
    });


    if (!watchlist.imageUrl) {
      watchlist.imageUrl = imageUrl;
    }


    await watchlist.save();


    return NextResponse.json(
      watchlist,
      {
        status:200,
      }
    );


  } catch(error) {

    console.error(
      "Add watchlist item error:",
      error
    );


    return NextResponse.json(
      {
        error:"An error occurred",
      },
      {
        status:500,
      }
    );
  }
}





// Update watchlist image
export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id:string }>;
  }
) {

  try {

    const session = await getAuthSession();


    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error:"Unauthorized",
        },
        {
          status:401,
        }
      );
    }


    const { id } = await params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          error:"Invalid watchlist id",
        },
        {
          status:400,
        }
      );
    }


    const { imageUrl } = await req.json();


    await connectDB();


    const watchlist =
      await Watchlist.findOneAndUpdate(
        {
          _id:id,
          user:session.user.id,
        },
        {
          imageUrl,
        },
        {
          new:true,
        }
      );


    if (!watchlist) {
      return NextResponse.json(
        {
          error:"Watchlist not found",
        },
        {
          status:404,
        }
      );
    }


    return NextResponse.json(watchlist);


  } catch(error) {

    console.error(
      "Update watchlist image error:",
      error
    );


    return NextResponse.json(
      {
        error:"Server error",
      },
      {
        status:500,
      }
    );
  }
}





// Get all items in watchlist
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id:string }>;
  }
) {

  try {

    const session = await getAuthSession();


    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error:"Unauthorized",
        },
        {
          status:401,
        }
      );
    }


    const { id } = await params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          error:"Invalid ID",
        },
        {
          status:400,
        }
      );
    }


    await connectDB();


    const watchlist =
      await Watchlist.findOne({
        _id:id,
        user:session.user.id,
      });


    if (!watchlist) {
      return NextResponse.json(
        {
          error:"Watchlist not found",
        },
        {
          status:404,
        }
      );
    }


    return NextResponse.json(watchlist);


  } catch(error) {

    console.error(
      "Get watchlist error:",
      error
    );


    return NextResponse.json(
      {
        error:"Server error",
      },
      {
        status:500,
      }
    );
  }
}





// Delete watchlist
export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id:string }>;
  }
) {

  try {

    const session = await getAuthSession();


    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error:"Unauthorized",
        },
        {
          status:401,
        }
      );
    }


    const { id } = await params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          error:"Invalid watchlist id",
        },
        {
          status:400,
        }
      );
    }


    await connectDB();


    const watchlist =
      await Watchlist.findOneAndDelete({
        _id:id,
        user:session.user.id,
      });


    if (!watchlist) {
      return NextResponse.json(
        {
          error:"Watchlist not found",
        },
        {
          status:404,
        }
      );
    }


    return NextResponse.json(
      {
        message:"Watchlist deleted successfully",
      }
    );


  } catch(error) {

    console.error(
      "Delete watchlist error:",
      error
    );


    return NextResponse.json(
      {
        error:"Server error",
      },
      {
        status:500,
      }
    );
  }
}