"use client"

import React, { useState, useMemo, useEffect } from "react";
import yaml from "js-yaml";
import mythicmobsTemplate from "@/content/schemas/mythicmobs.json";
// import mythicitemsTemplate from "@/content/schemas/mythicitems.json";
// import luckpermsTemplate from "@/content/schemas/luckperms.json";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu"
import { Button } from "@/registry/new-york-v4/ui/button"
import { IconCopy, IconDownload } from "@tabler/icons-react"
import { MythicMobOptionsForm, MythicMobCodeBlock } from "@/content/schemas/mythic_mob_generator"
import { useForm, useFieldArray } from "react-hook-form";
import type { MobForm } from "@/content/schemas/mythic_mob_generator";

const pluginOptions = [
  { value: "mythicmobs", label: "MythicMobs" },
  // { value: "mythicitems", label: "MythicItems" },
  // { value: "luckperms", label: "LuckPerms" },
];

const pluginTemplates = {
  mythicmobs: mythicmobsTemplate,
  // mythicitems: mythicitemsTemplate,
  // luckperms: luckpermsTemplate,
};

function renderFormFields(obj, path = [], onChange, values) {
  return Object.entries(obj).map(([key, value]) => {
    const fieldPath = [...path, key];
    const fieldName = fieldPath.join(".");
    const currentValue = fieldPath.reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : ""), values);

    if (Array.isArray(value)) {
      // For arrays, render a textarea for comma-separated values
      return (
        <div key={fieldName} className="mb-2">
          <label className="block font-semibold mb-1">{fieldName}</label>
          <textarea
            className="input w-full"
            value={currentValue || ""}
            onChange={e => onChange(fieldPath, e.target.value.split(",").map(v => v.trim()).filter(Boolean))}
            placeholder={JSON.stringify(value)}
          />
        </div>
      );
    } else if (typeof value === "object" && value !== null) {
      // For nested objects, recurse
      return (
        <fieldset key={fieldName} className="mb-2 border p-2 rounded">
          <legend className="font-semibold">{fieldName}</legend>
          {renderFormFields(value, fieldPath, onChange, values)}
        </fieldset>
      );
    } else {
      // For primitives, render input
      return (
        <div key={fieldName} className="mb-2">
          <label className="block font-semibold mb-1">{fieldName}</label>
          <input
            className="input w-full"
            type={typeof value === "number" ? "number" : "text"}
            value={currentValue ?? ""}
            onChange={e => onChange(fieldPath, typeof value === "number" ? Number(e.target.value) : e.target.value)}
            placeholder={String(value)}
          />
        </div>
      );
    }
  });
}

function setValueByPath(obj, path, value) {
  if (path.length === 1) {
    return { ...obj, [path[0]]: value };
  }
  const [head, ...rest] = path;
  return {
    ...obj,
    [head]: setValueByPath(obj[head] || {}, rest, value),
  };
}

const javaGameVersions = [
  "1.21.6", "1.21.5", "1.21.4", "1.21.3", "1.21.2", "1.21.1", "1.21",
  "1.20.6", "1.20.5", "1.20.4", "1.20.3", "1.20.2", "1.20.1", "1.20",
  "1.19.4", "1.19.3", "1.19.2", "1.19.1", "1.19",
  "1.18.2", "1.18.1", "1.18",
  "1.17.1", "1.17",
  "1.16.5", "1.16.4", "1.16.3", "1.16.2", "1.16.1", "1.16",
  "1.15.2", "1.15.1", "1.15",
  "1.14.4", "1.14.3", "1.14.2", "1.14.1", "1.14",
  "1.13.2", "1.13.1", "1.13",
  "1.12.2", "1.12.1", "1.12",
];

const exampleYaml = `mythicmobs:
  mobs:
    - name: ZombieKing
      health: 200
      damage: 15
      skills:
        - name: SummonMinions
          chance: 0.2
`;
const exampleJson = `{
  "mythicmobs": {
    "mobs": [
      {
        "name": "ZombieKing",
        "health": 200,
        "damage": 15,
        "skills": [
          {
            "name": "SummonMinions",
            "chance": 0.2
          }
        ]
      }
    ]
  }
}`;

function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// export default function ConfigGeneratorPage() {
//   const [edition, setEdition] = useState<"java" | "bedrock" | null>(null);
//   const [type, setType] = useState<"plugin" | "mod" | null>(null);
//   const [version, setVersion] = useState<string | null>(null);
//   const [plugin, setPlugin] = useState<string | null>(null);
//   const [codeType, setCodeType] = useState<"yaml" | "json">("yaml");
//   const [copied, setCopied] = useState(false);
//   const mobTemplate = mythicmobsData.MobTemplate;

//   // Example: Use mobTemplate directly in your code block or form
//   // For demonstration, let's show the JSON in the code block
//   const code = useMemo(() => {
//     if (plugin === "mythicmobs") {
//       return codeType === "yaml"
//         ? "" // You can convert mobTemplate to YAML here if needed
//         : JSON.stringify(mobTemplate, null, 2);
//     }
//     return codeType === "yaml" ? exampleYaml : exampleJson;
//   }, [plugin, codeType, mobTemplate]);

//   // ...rest of your component...
// }

export default function ConfigGeneratorPage() {
  const [edition, setEdition] = useState<"java" | "bedrock" | null>(null);
  const [type, setType] = useState<"plugin" | "mod" | null>(null);
  const [version, setVersion] = useState<string | null>(null);
  const [plugin, setPlugin] = useState<string | null>("mythicmobs");
  const [codeType, setCodeType] = useState<"yaml" | "json">("yaml");
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState(() => JSON.parse(JSON.stringify(pluginTemplates[plugin || "mythicmobs"] || {})));

  useEffect(() => {
    setFormState(JSON.parse(JSON.stringify(pluginTemplates[plugin || "mythicmobs"] || {})));
  }, [plugin]);

  const handleFormChange = (path, value) => {
    setFormState(prev => setValueByPath(prev, path, value));
  };

  const code = useMemo(() => {
    if (!plugin) return "";
    if (codeType === "yaml") {
      return yaml.dump(formState, { lineWidth: 120 });
    }
    return JSON.stringify(formState, null, 2);
  }, [formState, codeType, plugin]);

  const handleCopy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleDownload = () => {
    if (!code) return;
    downloadFile(code, `config.${codeType === "yaml" ? "yml" : "json"}`);
  };

  return (
    <div className="mt-8 min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Minecraft Config Generator</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto">
        {/* LEFT: Options */}
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-8">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Game Edition */}
              <div>
                <label className="block text-sm font-medium mb-1">Game Edition</label>
                <select
                  className="input w-full"
                  value={edition ?? ""}
                  onChange={e => {
                    const val = e.target.value as "java" | "bedrock" | "";
                    setEdition(val === "" ? null : val);
                    setType(null);
                    setVersion(null);
                    setPlugin(null);
                  }}
                >
                  <option value="">-- Edition --</option>
                  <option value="java">Java Edition</option>
                  <option value="bedrock">Bedrock Edition</option>
                </select>
              </div>
              {/* Game Version */}
              <div>
                <label className="block text-sm font-medium mb-1">Game Version</label>
                <select
                  className="input w-full"
                  value={version ?? ""}
                  onChange={e => setVersion(e.target.value || null)}
                >
                  <option value="">-- Version --</option>
                  {javaGameVersions.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              {/* Type */}
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  className="input w-full"
                  value={type ?? ""}
                  onChange={e => {
                    const val = e.target.value as "plugin" | "mod" | "";
                    setType(val === "" ? null : val);
                    setPlugin(null);
                  }}
                >
                  <option value="">-- Type --</option>
                  <option value="plugin">Plugin</option>
                  <option value="mod">Mod</option>
                </select>
              </div>
              {/* Plugin */}
              {type === "plugin" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Plugin</label>
                  <select
                    className="input w-full"
                    value={plugin ?? ""}
                    onChange={e => setPlugin(e.target.value || null)}
                  >
                    <option value="">-- Plugin --</option>
                    {pluginOptions.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </form>
          {/* Bedrock Coming Soon */}
          {edition === "bedrock" && (
            <div className="text-yellow-600 font-medium mt-4">
              <p className="text-lg font-semibold">Note:</p>
              Bedrock support coming soon!
            </div>
          )}
          {/* Plugin Options: Render generic form for selected plugin */}
          <div className="p-4 flex flex-col gap-2 mt-4">
            {plugin && pluginTemplates[plugin] ? (
              renderFormFields(pluginTemplates[plugin], [], handleFormChange, formState)
            ) : (
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {plugin ? `Configure options for ${plugin}` : "Select a plugin to configure options."}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Live Code Generator */}
        <div className="w-full md:w-2/3 flex-1 border rounded-lg bg-gray-50 dark:bg-gray-800 mt-0 p-0 overflow-hidden shadow">
          <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-100 dark:bg-gray-900">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn"
                onClick={() => setCodeType("yaml")}
                style={{ fontWeight: codeType === "yaml" ? "bold" : undefined }}
              >YAML</button>
              <button
                type="button"
                className="btn"
                onClick={() => setCodeType("json")}
                style={{ fontWeight: codeType === "json" ? "bold" : undefined }}
              >JSON</button>
              <button
                type="button"
                className="btn"
                onClick={handleCopy}
                aria-label="Copy code"
                disabled={!code}
              >Copy</button>
              <button
                type="button"
                className="btn"
                onClick={handleDownload}
                aria-label="Download code"
                disabled={!code}
              >Download</button>
              {copied && (
                <span className="ml-2 text-green-600 text-xs font-medium">Copied!</span>
              )}
            </div>
          </div>
          <div className="p-4">
            <pre className="overflow-x-auto text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded">
              <code className="whitespace-pre-wrap">{code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}