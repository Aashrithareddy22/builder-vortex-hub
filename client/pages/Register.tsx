import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const schema = z
  .object({
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Enter a valid email"),
    username: z.string().min(2, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string().min(6, "Confirm password"),
    role: z.enum(["Volunteer", "NGO", "Admin"]).default("Volunteer"),
    location: z.string().optional(),
  })
  .refine((v) => v.password === v.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

type FormData = z.infer<typeof schema>;

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { role: "Volunteer" } });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Account created");
    navigate("/login");
  };

  return (
    <main className="min-h-[calc(100vh-56px)] bg-gradient-to-b from-background to-muted/30">
      <section className="container grid gap-10 py-10 md:grid-cols-2 md:py-16">
        {/* Left marketing */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Create a new account</h1>
          <p className="mt-3 max-w-prose text-muted-foreground">
            Fill in your details to join WasteZero and start scheduling pickups, tracking impact, and collaborating with your community.
          </p>
        </div>

        {/* Right card */}
        <div className="mx-auto w-full max-w-xl">
          <div className="mb-2 grid grid-cols-2 overflow-hidden rounded-lg border bg-muted/40 text-sm">
            <Link to="/login" className="px-4 py-2 text-center text-muted-foreground hover:text-foreground">Login</Link>
            <button className="bg-background px-4 py-2 font-medium">Register</button>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="md:col-span-1">
                <label className="text-sm font-medium">Full Name</label>
                <input className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring" placeholder="Your full name" {...register("name")} />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div className="md:col-span-1">
                <label className="text-sm font-medium">Email</label>
                <input className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring" placeholder="Your email" {...register("email")} />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
              </div>

              <div className="md:col-span-1">
                <label className="text-sm font-medium">Username</label>
                <input className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring" placeholder="Choose a username" {...register("username")} />
                {errors.username && <p className="mt-1 text-xs text-destructive">{errors.username.message}</p>}
              </div>
              <div className="md:col-span-1">
                <label className="text-sm font-medium">Role</label>
                <select className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring" {...register("role")}>
                  <option>Volunteer</option>
                  <option>NGO</option>
                  <option>Admin</option>
                </select>
              </div>

              <div className="md:col-span-1">
                <label className="text-sm font-medium">Password</label>
                <input type="password" className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring" placeholder="Create a password" {...register("password")} />
                {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
              </div>
              <div className="md:col-span-1">
                <label className="text-sm font-medium">Confirm Password</label>
                <input type="password" className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring" placeholder="Confirm your password" {...register("confirm")} />
                {errors.confirm && <p className="mt-1 text-xs text-destructive">{errors.confirm.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium">Location (Optional)</label>
                <input className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring" placeholder="Your city or area" {...register("location")} />
              </div>

              <div className="md:col-span-2 mt-2">
                <button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground shadow hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70">
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
