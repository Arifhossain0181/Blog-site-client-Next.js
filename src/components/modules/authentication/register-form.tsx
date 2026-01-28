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
  name: z.string().min(4 ,"Name must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})


export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators:{
      onSubmit: formSchema,
    },
    onSubmit:async ({value})=>{
     const toastid=  toast.loading("creating user")
     try{
       const usersdata= {
        name:value.name,
        email:value.email,
        password:value.password
      }
      const {data,error} = await authClient.signUp.email(value);
      if(error){
        toast.error("Error creating user",{id:toastid});
        return
      }
      toast.success("User created successfully",{id:toastid});
     }catch(err){
      console.log("Registration error:",err);
      toast.error("Error creating user",{id:toastid});
     }
    }
  })
  
  
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login" onSubmit={(e)=>{
          e.preventDefault()
          form.handleSubmit()
        }}>

          <FieldGroup>
            <form.Field name="name" children={(field)=>{
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return(
                <Field>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input 
                    id={field.name}
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
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}
