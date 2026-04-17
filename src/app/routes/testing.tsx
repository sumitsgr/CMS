import { useState, useRef, useEffect } from "react";
import { User, X, ChevronDown, Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Form, FormDrawer, Input } from "../../components/ui/form";
import { Select } from "../../components/ui/form/select";
import { Switch } from "../../components/ui/form/switch";
import {
  createUserSchema,
  useCreateUser,
  useAdmins,
  useSupervisors,
  useProjects,
} from "../../features/users/api/create-user";

const ROLE_OPTIONS = [
  { label: "-- Select role --", value: "" },
  { label: "Electrician", value: "1" },
  { label: "Supervisor", value: "2" },
  { label: "Admin", value: "4" },
  { label: "Client", value: "5" },
];

// ── Multi-select dropdown ─────────────────────────────────────────────────────
interface MultiSelectOption { label: string; value: number; }
interface MultiSelectProps {
  label: string;
  options: MultiSelectOption[];
  selected: number[];
  onChange: (selected: number[]) => void;
  placeholder?: string;
  error?: { message?: string };
}

const MultiSelect = ({
  label, options, selected, onChange,
  placeholder = "Select...", error,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (value: number) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} className="flex flex-col gap-1.5 relative">
      <span className="text-sm font-medium leading-none">{label}</span>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => { setOpen((p) => !p); setSearch(""); }}
        className={`flex h-9 w-full items-center justify-between rounded-md border px-3 py-1 text-sm shadow-sm bg-transparent text-left
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
          ${error ? "border-destructive" : "border-input"}`}
      >
        <span className={selected.length === 0 ? "text-muted-foreground" : "font-medium"}>
          {selected.length === 0
            ? placeholder
            : `${selected.length} project${selected.length > 1 ? "s" : ""} selected`}
        </span>
        <ChevronDown className={`size-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-50 w-full rounded-md border border-input bg-popover shadow-lg overflow-hidden">
          {/* Search */}
          <div className="flex items-center gap-2 border-b border-input px-3 py-2">
            <Search className="size-3.5 text-muted-foreground shrink-0" />
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* Select all / Clear */}
          {options.length > 0 && (
            <div className="flex items-center justify-between border-b border-input px-3 py-1.5">
              <button
                type="button"
                onClick={() => onChange(filtered.map((o) => o.value))}
                className="text-xs text-primary hover:underline"
              >
                Select all
              </button>
              {selected.length > 0 && (
                <button
                  type="button"
                  onClick={() => onChange([])}
                  className="text-xs text-muted-foreground hover:text-destructive hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          {/* Options list */}
          <div className="max-h-44 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-3 py-3 text-sm text-muted-foreground text-center">No projects found</p>
            ) : (
              filtered.map((opt) => {
                const isChecked = selected.includes(opt.value);
                return (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2.5 px-3 py-2 text-sm cursor-pointer transition-colors
                      ${isChecked
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggle(opt.value)}
                      className="accent-primary"
                    />
                    {opt.label}
                    {isChecked && <span className="ml-auto text-blue-500 text-xs">✓</span>}
                  </label>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Selected tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {options.filter((o) => selected.includes(o.value)).map((o) => (
            <span
              key={o.value}
              className="inline-flex items-center gap-1 rounded-md bg-blue-50 border border-blue-200 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:border-blue-700"
            >
              {o.label}
              <button
                type="button"
                onClick={() => toggle(o.value)}
                className="ml-0.5 rounded hover:text-blue-900"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {error?.message && (
        <p className="text-[0.8rem] font-medium text-destructive">{error.message}</p>
      )}
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const CreateUser = () => {
  const [isActive, setIsActive] = useState(true);
  const { data: admins, isLoading } = useAdmins();
  const { data: supervisors } = useSupervisors();
  const { data: projects } = useProjects();

  const adminOptions = [
    { label: "-- Select admin --", value: "" },
    ...(admins?.admins?.map((admin) => ({
      label: admin.name,
      value: admin.id.toString(),
    })) || []),
  ];

  const supervisorsOptions = [
    { label: "-- Select supervisors --", value: "" },
    ...(supervisors?.supervisors?.map((s) => ({
      label: s.name,
      value: s.id.toString(),
    })) || []),
  ];

  const projectOptions: { label: string; value: number }[] =
    projects?.projects?.map((p) => ({
      label: p.project_name,
      value: p.id,
    })) || [];

  const createUserMutation = useCreateUser({
    mutationConfig: {
      onSuccess: () => alert("User created successfully"),
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
        options={{ defaultValues: { project_ids: [], is_active: 1 } }}
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
          const projectIds = watch("project_ids") ?? [];

          return (
            // 👇 Constrained scroll area — footer never gets pushed out
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(100dvh - 130px)" }}
            >
              <div className="flex flex-col gap-5 px-4 py-2 pb-8">

                {/* ── Account info ── */}
                <section className="flex flex-col gap-3">
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
                  {/* <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Projects
                  </p> */}
                  <MultiSelect
                    label="Assign Projects"
                    options={projectOptions}
                    selected={projectIds}
                    onChange={(ids) =>
                      setValue("project_ids", ids, { shouldValidate: true })
                    }
                    placeholder="-- Select projects --"
                    error={formState.errors.project_ids as { message?: string } | undefined}
                  />
                </section>

                <hr className="border-border" />

                {/* ── Hierarchy ── */}
                <section className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      label="Admin"
                      options={isLoading ? [{ label: "Loading...", value: "" }] : adminOptions}
                      defaultValue=""
                      error={formState.errors.admin_id}
                      registration={register("admin_id")}
                    />
                    <Select
                      label="Supervisors"
                      options={isLoading ? [{ label: "Loading...", value: "" }] : supervisorsOptions}
                      defaultValue=""
                      error={formState.errors.supervisor_id}
                      registration={register("supervisor_id")}
                    />
                  </div>
                </section>

              </div>
            </div>
          );
        }}
      </Form>
    </FormDrawer>
  );
};

export default CreateUser;