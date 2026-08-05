import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Palette,
  Cpu,
  Bell,
  Plug,
  ShieldCheck,
  Check,
  Download,
  Trash2,
  AlertTriangle,
  KeyRound,
  UploadCloud,
} from "lucide-react";
import type { AccentName } from "@/lib/mock-data";
import { accentOptions } from "@/lib/mock-data";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

type SectionId =
  | "profile"
  | "appearance"
  | "ai"
  | "notifications"
  | "integrations"
  | "privacy";

const sections: { id: SectionId; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "ai", label: "AI & Model", icon: Cpu },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "privacy", label: "Privacy & Data", icon: ShieldCheck },
];

const models = [
  { id: "evermind-2", name: "EverMind 2", desc: "Fast, private, grounded in your memories", tag: "Default" },
  { id: "evermind-2-strong", name: "EverMind 2 Strong", desc: "Deeper reasoning for complex analysis", tag: "Slow" },
  { id: "evermind-classic", name: "EverMind Classic", desc: "Lightweight legacy model", tag: "" },
];

function SettingRow({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass card-shadow rounded-2xl p-5 sm:p-6">
      <div className="mb-1">
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

function ProfileSection() {
  const profile = useAppStore((s) => s.profile);
  const updateProfile = useAppStore((s) => s.updateProfile);
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({
      ...form,
      initials: form.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase(),
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SectionCard title="Profile" description="How you appear across EverMind">
      <div className="mt-5 flex items-center gap-4">
        <Avatar className="size-16 ring-2 ring-violet-500/40">
          <AvatarFallback className="text-lg">{form.initials || "AD"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold">{form.name}</p>
          <p className="text-xs text-muted-foreground">{form.role}</p>
          <Button variant="outline" size="sm" className="mt-2">
            Change photo
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Full name</label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Email</label>
          <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Role</label>
          <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Bio</label>
          <Textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="min-h-20"
          />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <Button variant="gradient" onClick={handleSave}>
          <Check className="size-4" /> Save changes
        </Button>
        <AnimatePresence>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs font-medium text-emerald-400"
            >
              Profile updated
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </SectionCard>
  );
}

function AppearanceSection() {
  const accent = useAppStore((s) => s.accent);
  const setAccent = useAppStore((s) => s.setAccent);
  const preferences = useAppStore((s) => s.preferences);
  const updatePreferences = useAppStore((s) => s.updatePreferences);

  return (
    <SectionCard title="Appearance" description="Make EverMind feel like yours">
      <p className="mt-5 text-xs font-medium text-muted-foreground">Accent color</p>
      <div className="mt-2.5 flex flex-wrap gap-3">
        {accentOptions.map((option) => (
          <button
            key={option.name}
            onClick={() => setAccent(option.name as AccentName)}
            className="group flex cursor-pointer flex-col items-center gap-1.5"
          >
            <span
              className={cn(
                "flex size-10 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-110",
                accent === option.name
                  ? "ring-2 ring-white/80 ring-offset-2 ring-offset-background"
                  : "ring-1 ring-white/15",
              )}
              style={{ backgroundColor: option.hex }}
            >
              {accent === option.name && <Check className="size-4 text-white" />}
            </span>
            <span className="text-[10px] text-muted-foreground">{option.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-2 divide-y divide-white/[0.06]">
        <SettingRow title="Compact density" description="Show more memories per screen">
          <Switch
            checked={preferences.denseMode}
            onCheckedChange={(v) => updatePreferences({ denseMode: v })}
          />
        </SettingRow>
        <SettingRow title="Reduce motion" description="Minimize animations and transitions">
          <Switch
            checked={preferences.reduceMotion}
            onCheckedChange={(v) => updatePreferences({ reduceMotion: v })}
          />
        </SettingRow>
      </div>
    </SectionCard>
  );
}

function AiSection() {
  const preferences = useAppStore((s) => s.preferences);
  const updatePreferences = useAppStore((s) => s.updatePreferences);

  return (
    <SectionCard title="AI & Model" description="Control how EverMind thinks for you">
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => updatePreferences({ aiModel: model.id })}
            className={cn(
              "glass glass-hover cursor-pointer rounded-xl p-4 text-left transition-all",
              preferences.aiModel === model.id &&
                "border-violet-500/50 bg-violet-500/[0.08] shadow-[0_4px_20px_-6px_rgba(139,92,246,0.5)]",
            )}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{model.name}</p>
              {preferences.aiModel === model.id && (
                <span className="flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500">
                  <Check className="size-3 text-white" />
                </span>
              )}
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{model.desc}</p>
            {model.tag && (
              <Badge variant="secondary" className="mt-2 cursor-default">
                {model.tag}
              </Badge>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Creativity</p>
          <span className="text-xs font-semibold text-violet-300">
            {Math.round(preferences.temperature * 100)}%
          </span>
        </div>
        <Slider
          className="mt-3"
          min={0}
          max={100}
          step={5}
          value={[preferences.temperature * 100]}
          onValueChange={([v]) => updatePreferences({ temperature: v / 100 })}
        />
        <p className="mt-2 text-[11px] text-muted-foreground">
          Lower = more factual and consistent · Higher = more exploratory answers
        </p>
      </div>

      <div className="mt-2 divide-y divide-white/[0.06]">
        <SettingRow title="Auto-summarize captures" description="Generate AI summaries and tags on every memory">
          <Switch
            checked={preferences.autoSummarize}
            onCheckedChange={(v) => updatePreferences({ autoSummarize: v })}
          />
        </SettingRow>
        <SettingRow title="Semantic search" description="Find memories by meaning, not just keywords">
          <Switch
            checked={preferences.semanticSearch}
            onCheckedChange={(v) => updatePreferences({ semanticSearch: v })}
          />
        </SettingRow>
      </div>
    </SectionCard>
  );
}

function NotificationsSection() {
  const preferences = useAppStore((s) => s.preferences);
  const updatePreferences = useAppStore((s) => s.updatePreferences);

  return (
    <SectionCard title="Notifications" description="Choose what EverMind tells you">
      <div className="mt-2 divide-y divide-white/[0.06]">
        <SettingRow title="Weekly digest" description="A Sunday AI summary of your week's memories">
          <Switch
            checked={preferences.weeklyDigest}
            onCheckedChange={(v) => updatePreferences({ weeklyDigest: v })}
          />
        </SettingRow>
        <SettingRow title="Product updates" description="New features and model improvements">
          <Switch
            checked={preferences.productUpdates}
            onCheckedChange={(v) => updatePreferences({ productUpdates: v })}
          />
        </SettingRow>
        <SettingRow title="Task reminders" description="Notify before high-priority tasks are due">
          <Switch checked onCheckedChange={() => {}} />
        </SettingRow>
      </div>
    </SectionCard>
  );
}

function IntegrationsSection() {
  const integrations = useAppStore((s) => s.integrations);
  const toggleIntegration = useAppStore((s) => s.toggleIntegration);

  return (
    <SectionCard title="Integrations" description="Connect the tools where your thinking happens">
      <div className="mt-5 space-y-2.5">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <div
              key={integration.id}
              className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5"
            >
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md",
                  integration.accent,
                )}
              >
                <Icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{integration.name}</p>
                <p className="truncate text-xs text-muted-foreground">{integration.description}</p>
              </div>
              <Badge
                variant={integration.connected ? "emerald" : "secondary"}
                className="hidden cursor-default sm:inline-flex"
              >
                {integration.connected ? "Connected" : "Not connected"}
              </Badge>
              <Switch
                checked={integration.connected}
                onCheckedChange={() => toggleIntegration(integration.id)}
              />
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

function PrivacySection() {
  const preferences = useAppStore((s) => s.preferences);
  const updatePreferences = useAppStore((s) => s.updatePreferences);
  const memories = useAppStore((s) => s.memories);
  const [confirming, setConfirming] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(memories, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "evermind-export.json";
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    window.setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="space-y-4">
      <SectionCard title="Privacy & data" description="Your second brain, under your control">
        <div className="mt-2 divide-y divide-white/[0.06]">
          <SettingRow title="Encrypted cloud backup" description="End-to-end encrypted copies of your memories">
            <Switch
              checked={preferences.cloudBackup}
              onCheckedChange={(v) => updatePreferences({ cloudBackup: v })}
            />
          </SettingRow>
          <SettingRow title="Incognito capture" description="Skip AI indexing for new captures">
            <Switch
              checked={preferences.incognitoMode}
              onCheckedChange={(v) => updatePreferences({ incognitoMode: v })}
            />
          </SettingRow>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="size-4" /> Export data
          </Button>
          {exported && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-medium text-emerald-400"
            >
              Export downloaded
            </motion.span>
          )}
          <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
            <KeyRound className="size-3.5" /> Managed locally — no third-party storage
          </span>
        </div>
      </SectionCard>

      <div className="glass card-shadow rounded-2xl border-rose-500/25 p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight text-rose-400">
          <AlertTriangle className="size-4" /> Danger zone
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Deleting your workspace permanently removes all memories, tasks, and
          settings. This cannot be undone.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              if (confirming) {
                setConfirming(false);
              } else {
                setConfirming(true);
                window.setTimeout(() => setConfirming(false), 4000);
              }
            }}
            className={cn(
              "text-rose-400 hover:bg-rose-500/10 hover:text-rose-300",
              confirming && "border-rose-500/60 bg-rose-500/15",
            )}
          >
            <Trash2 className="size-4" />
            {confirming ? "Click again to confirm" : "Delete workspace"}
          </Button>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <UploadCloud className="size-3.5 text-emerald-400" />
            Last backup: today, 06:42 AM
          </span>
        </div>
      </div>
    </div>
  );
}

export function SettingsPage() {
  const [active, setActive] = useState<SectionId>("profile");

  const sectionComponents: Record<SectionId, React.ReactNode> = {
    profile: <ProfileSection />,
    appearance: <AppearanceSection />,
    ai: <AiSection />,
    notifications: <NotificationsSection />,
    integrations: <IntegrationsSection />,
    privacy: <PrivacySection />,
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pt-6 pb-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Workspace, model, and privacy controls
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="scrollbar-none flex gap-1.5 overflow-x-auto lg:sticky lg:top-20 lg:flex-col lg:self-start">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActive(section.id)}
                className={cn(
                  "relative flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all",
                  active === section.id
                    ? "text-white"
                    : "text-muted-foreground hover:bg-white/[0.05] hover:text-foreground",
                )}
              >
                {active === section.id && (
                  <motion.span
                    layoutId="settings-active"
                    className="absolute inset-0 rounded-xl border border-violet-400/25 bg-gradient-to-r from-violet-500/20 to-blue-500/10"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon
                  className={cn(
                    "relative size-4 transition-transform",
                    active === section.id && "text-violet-300",
                  )}
                />
                <span className="relative whitespace-nowrap">{section.label}</span>
              </button>
            );
          })}
        </nav>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="min-w-0"
          >
            {sectionComponents[active]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
