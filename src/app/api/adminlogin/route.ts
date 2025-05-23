import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcrypt"; 

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json();

    const { data, error } = await supabase
      .from("admin")
      .select("*")
      .eq("email", email);

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 400 }
      );
    }

    const admin = data[0];

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 400 }
      );
    }

    const token = `${admin.admin_id}-${admin.email}`;

    return NextResponse.json(
      {
        success: true,
        token,
        message: "Logged in successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};