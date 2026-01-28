"use client"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})


export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
   const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    })
  }

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators:{
      onSubmit: formSchema,
    },
    onSubmit:async ({value})=>{
     const toastid=  toast.loading("Logging in...")
     try{
      const {data,error} = await authClient.signIn.email({
        email:value.email,
        password:value.password
      });
      if(error){
        toast.error("Invalid email or password",{id:toastid});
        return
      }
      toast.success("Login successful!",{id:toastid});
     }catch(err){
      console.log("Login error:",err);
      toast.error("Login failed",{id:toastid});
     }
    }
  })
  
  
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>
          Enter your credentials to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login" onSubmit={(e)=>{
          e.preventDefault()
          form.handleSubmit()
        }}>

          <FieldGroup>
            <form.Field name="email" children={(field)=>{
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return(
                <Field>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input 
                    id={field.name}
                    type="email"
                    value={field.state.value} 
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors}/>
                  )}
                </Field>
              )
            }} />

            <form.Field name="password" children={(field)=>{
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return(
                <Field>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input 
                    id={field.name}
                    type="password"
                    value={field.state.value} 
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors}/>
                  )}
                </Field>
              )
            }} />
          </FieldGroup>
          
          <div className="flex justify-center mt-6">
            <Button type="submit" className="w-full">Login</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}
