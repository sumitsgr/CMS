import { useState } from "react";
import { User, X, Plus } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Form, FormDrawer, Input } from "../../../components/ui/form";
import { Select } from "../../../components/ui/form/select";
import { Switch } from "../../../components/ui/form/switch";
import { createUserSchema, useCreateUser } from "../api/create-user";

const ROLE_OPTIONS = [
  { label: "Select role", value: "" },
  { label: "Electrician", value: "1" },
  { label: "Supervisor", value: "2" },
  // { label: "Super Admin", value: "3" },
  { label: "Admin", value: "4" },
  { label: "Client", value: "5" },
];

export const CreateUser = () => {
  const [projectInput, setProjectInput] = useState("");
  const [isActive, setIsActive] = useState(true);

  const createUserMutation = useCreateUser({
    mutationConfig: {
      onSuccess: () => {
        alert("User created successfully");
      },
    },
  });

  return (
    <FormDrawer
      isDone={createUserMutation.isSuccess}
      triggerButton={
        <Button icon={<User className="size-4" />} size="sm">
          Create User
        </Button>
      }
      title="Create User"
      submitButton={
        <Button form="create-user" type="submit" size="sm">
          Submit
        </Button>
      }
    >
      <Form
        id="create-user"
        schema={createUserSchema}
        options={{
          defaultValues: {
            project_ids: [],   // 👈 initialize so Zod sees an array, not undefined
            is_active: 1,
          },
        }}
        onSubmit={(values) => {
          createUserMutation.mutate({
            data: {
              ...values,
              is_active: isActive ? 1 : 0,
              employee_code: `E-${Date.now()}`,
              admin_id: values.admin_id ?? "",
              supervisor_id: values.supervisor_id ?? "",
            },
          });
        }}
      >
        {({ register, formState, watch, setValue }) => {
          const projectIds = watch("project_ids") ?? [];  // 👈 read from RHF

          const addProject = () => {
            const val = parseInt(projectInput.trim());
            if (!isNaN(val) && !projectIds.includes(val)) {
              setValue("project_ids", [...projectIds, val], {
                shouldValidate: true,   // 👈 triggers Zod validation immediately
              });
            }
            setProjectInput("");
          };

          const removeProject = (id: number) => {
            setValue(
              "project_ids",
              projectIds.filter((p) => p !== id),
              { shouldValidate: true }
            );
          };

          return (
            <div className="flex flex-col gap-5 px-4">

              {/* ── Account info ── */}
              <section className="flex flex-col gap-3">
                {/* <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Account info
                </p> */}
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Name"
                    error={formState.errors.name}
                    registration={register("name")}
                  />
                  <Input
                    label="Mobile"
                    error={formState.errors.mobile}
                    registration={register("mobile")}
                  />
                  <div className="col-span-2">
                    <Input
                      label="Email"
                      type="email"
                      error={formState.errors.email}
                      registration={register("email")}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      label="Password"
                      type="password"
                      error={formState.errors.password}
                      registration={register("password")}
                    />
                  </div>
                </div>
              </section>

              <hr className="border-border" />

              {/* ── Role & Status ── */}
              <section className="flex flex-col gap-3">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Role & status
                </p>
                <div className="grid grid-cols-2 gap-3 items-end">
                  <Select
                    label="Role"
                    options={ROLE_OPTIONS}
                    error={formState.errors.role_id}
                    registration={register("role_id", { valueAsNumber: true })}
                  />
                  <div className="flex flex-col gap-2 pb-1">
                    <span className="text-sm font-medium leading-none">Status</span>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={isActive}
                        onCheckedChange={setIsActive}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span className={`text-sm ${isActive ? "text-green-600" : "text-muted-foreground"}`}>
                        {isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
                
              </section>

              <hr className="border-border" />

              {/* ── Projects ── */}
              <section className="flex flex-col gap-3">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Projects
                </p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={projectInput}
                    onChange={(e) => setProjectInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addProject();
                      }
                    }}
                    placeholder="Enter project ID"
                    className="flex h-9 flex-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={addProject}>
                    <Plus className="size-4" />
                  </Button>
                </div>

                {projectIds.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {projectIds.map((id) => (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 rounded-md bg-blue-50 border border-blue-200 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-700"
                        // className="border"
                      >
                        Project {id}
                        <button
                          type="button"
                          onClick={() => removeProject(id)}
                          className="ml-0.5 rounded hover:text-blue-900"
                        >
                          <X className="size-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {formState.errors.project_ids && (
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {formState.errors.project_ids.message as string}
                  </p>
                )}
              </section>

              <hr className="border-border" />

              {/* ── Hierarchy ── */}
              <section className="flex flex-col gap-3">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Hierarchy{" "}
                  <span className="normal-case font-normal tracking-normal">— optional</span>
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Admin ID"
                    error={formState.errors.admin_id}
                    registration={register("admin_id")}
                  />
                  <Input
                    label="Supervisor ID"
                    error={formState.errors.supervisor_id}
                    registration={register("supervisor_id")}
                  />
                </div>
              </section>

            </div>
          );
        }}
      </Form>
    </FormDrawer>
  );
};