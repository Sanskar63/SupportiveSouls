"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import CustomNavbar from "@/components/ui/custom-navbar";
import Footer from "@/components/ui/footer";
import axios from 'axios';
import toast from 'react-hot-toast';


export default function SignupFormDemo() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [aadhar, setAadhar] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    console.log("Form submitted");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("role", role);
    formData.append("hours", hours);
    formData.append("about", about);
    formData.append("aadhar", aadhar);

    try {
      const res = await axios.post("/api/Form/submit", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res);
      alert("Applied Successfully");
      toast.success("Applied");
      router.push("/");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Could't Apply");
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="w-[100%]">
      <CustomNavbar />

      <div className="h-[20vh]"></div>

      <div className="w-[90vw] md:w-[60vw] lg:w-[40vw] mx-auto rounded-xl md:rounded-2xl p-4 md:p-8 shadow-input bg-purple-light">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to SupportiveSouls
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          You can help society by volunteering. Volunteer in any role you find yourself fit in.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="Name">Name</Label>
            <Input id="Name" placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
          </LabelInputContainer>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="contact">Contact</Label>
              <Input id="contact" placeholder="9987654321" type="text" onChange={(e) => setContact(e.target.value)} />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="abcd@gmail.com" type="email" onChange={(e) => setEmail(e.target.value)} />
            </LabelInputContainer>
          </div>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="role">Role</Label>
              <Input id="role" placeholder="Teacher" type="text" onChange={(e) => setRole(e.target.value)} />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="hours">Hours per week</Label>
              <Input id="hours" placeholder="3" type="text" onChange={(e) => setHours(e.target.value)} />
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="aadhar">Aadhar Number</Label>
            <Input id="aadhar" placeholder="000000000000" type="text" onChange={(e) => setAadhar(e.target.value)} />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="about">About</Label>
            <Input id="about" placeholder="optional" type="text" onChange={(e) => setAbout(e.target.value)} />
          </LabelInputContainer>

          {loading ? (
            <button
              className="bg-purple-900 relative group/btn block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] hover:cursor-wait"
              type="submit"
              disabled
            >
              Apply &rarr;
              <BottomGradient />
            </button>
          ) : (
            <button
              className="bg-purple-mid relative group/btn block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] hover:cursor-pointer"
              type="submit"
            >
              Apply &rarr;
              <BottomGradient />
            </button>
          )}

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>

      <div className="h-[10vh]"></div>

      <Footer />
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
