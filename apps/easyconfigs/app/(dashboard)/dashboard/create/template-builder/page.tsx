"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Label } from "@/registry/new-york-v4/ui/label"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york-v4/ui/select"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Switch } from "@/registry/new-york-v4/ui/switch"
import { Separator } from "@/registry/new-york-v4/ui/separator"
import { 
  FileText, 
  Upload, 
  Code2, 
  Users, 
  Share,
  Plus,
  X,
  Info,
  Lightbulb,
  Tag
} from "lucide-react"

export default function CreateTemplatePage() {
  const { data: session, status } = useSession()

  // State for form fields - must be declared before any conditional returns
  const [templateName, setTemplateName] = useState("template.json")
  const [templateFileType, setTemplateFileType] = useState("JSON")
  const [templateDescription, setTemplateDescription] = useState("")
  const [templateVersion, setTemplateVersion] = useState("1.0.0")
  const [strictValidation, setStrictValidation] = useState(true)
  const [isPublic, setIsPublic] = useState(false)
  const [license, setLicense] = useState("MIT")
  const [documentation, setDocumentation] = useState("")

  // Generated JSON state
  const [generatedTemplate, setGeneratedTemplate] = useState("")

  // Template structure blocks state
  const [templateBlocks, setTemplateBlocks] = useState<Array<{
    id: number;
    fieldName: string;
    fieldType: string;
    required: boolean;
    description: string;
    defaultValue: string;
    options: string[];
  }>>([
    {
      id: 1,
      fieldName: "name",
      fieldType: "string",
      required: true,
      description: "Configuration name",
      defaultValue: "",
      options: [] // for select/enum types
    }
  ])

  // Generate template function
  const generateTemplate = () => {
    const templateFields: Record<string, any> = {}
    
    templateBlocks.forEach(block => {
      // Clean and normalize the field name
      const cleanedName = block.fieldName.trim().replace(/\s+/g, ' ')
      
      let sanitizedFieldName = ''
      
      // Check if it's already in PascalCase format (no spaces, starts uppercase, has letters)
      const isPascalCase = /^[A-Z][a-zA-Z0-9]*$/.test(cleanedName)
      
      if (isPascalCase) {
        // Already in PascalCase, just remove any invalid characters
        sanitizedFieldName = cleanedName.replace(/[^a-zA-Z0-9]/g, '')
      } else {
        // Convert to PascalCase: split by spaces, capitalize all words
        const words = cleanedName.split(' ').filter(word => word.length > 0)
        sanitizedFieldName = words
          .map((word) => {
            const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '')
            // All words: capitalize first letter
            return cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1).toLowerCase()
          })
          .join('')
      }
      
      const fieldDefinition: Record<string, any> = {
        type: block.fieldType,
        required: block.required,
        description: block.description || `${block.fieldName} field`
      }

      // Add default value if provided
      if (block.defaultValue) {
        fieldDefinition.default = block.fieldType === 'boolean'
          ? block.defaultValue === 'true'
          : block.fieldType === 'number'
          ? parseFloat(block.defaultValue) || 0
          : block.defaultValue
      }

      // Add options for select/enum types
      if (block.fieldType === 'select' && block.options.length > 0) {
        fieldDefinition.options = block.options
        fieldDefinition.type = 'string' // select is actually a string with limited options
      }

      // Add validation rules based on type
      if (block.fieldType === 'string' && block.defaultValue) {
        fieldDefinition.example = block.defaultValue
      }

      templateFields[sanitizedFieldName] = fieldDefinition
    })

    const template = {
      information: {
        file_name: templateName.toLowerCase().replace(/[^a-z0-9.]/g, '_') || "template.json",
        creator: session?.user?.name || 'Anonymous',
        last_edited: new Date().toISOString().split('T')[0],
        version: templateVersion.replace(/[^0-9.]/g, ''),
        description: templateDescription,
        file_type: templateFileType,
        license: license,
        public: isPublic,
        strict_validation: strictValidation
      },
      template: {
        schema_version: "1.0",
        target_file: templateName,
        fields: templateFields
      }
    }
    
    setGeneratedTemplate(JSON.stringify(template, null, 2))
  }

  // Template block management functions
  const addTemplateBlock = () => {
    const newBlock = {
      id: Date.now(),
      fieldName: "",
      fieldType: "string",
      required: false,
      description: "",
      defaultValue: "",
      options: []
    }
    setTemplateBlocks([...templateBlocks, newBlock])
  }

  const updateTemplateBlock = (id: number, field: string, value: any) => {
    setTemplateBlocks(templateBlocks.map(block =>
      block.id === id ? { ...block, [field]: value } : block
    ))
  }

  const removeTemplateBlock = (id: number) => {
    setTemplateBlocks(templateBlocks.filter(block => block.id !== id))
  }

  const addOptionToBlock = (blockId: number, option: string) => {
    setTemplateBlocks(templateBlocks.map(block =>
      block.id === blockId
        ? { ...block, options: [...block.options, option] }
        : block
    ))
  }

  const removeOptionFromBlock = (blockId: number, optionIndex: number) => {
    setTemplateBlocks(templateBlocks.map(block =>
      block.id === blockId
        ? { ...block, options: block.options.filter((_, index) => index !== optionIndex) }
        : block
    ))
  }

  // Initialize with default template
  useEffect(() => {
    generateTemplate()
  }, [])

  // Handle loading and authentication after all hooks
  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    redirect("/signin")
  }

  // const templateCategories = [
  //   "C", "C++", "C#", "CSS", "CQL",
  //   "Diff", "Dockerfile", "Git Markdown", "Golang", "HTML",
  //   "HTTP", "JavaScript", "JSON", "Lua", "Markdown",
  //   "MariaDB", "MS SQL", "MySQL", "Nginx", "PHP",
  //   "Plain Text", "PostgreSQL", "Properties", "Pug", "Python",
  //   "Ruby", "Rust", "Sass", "SCSS", "Shell",
  //   "SQL", "SQLite", "TOML", "TypeScript", "Vue",
  //   "XML", "YAML"
  // ]
  const templateCategories = [
  "JSON",
  "YAML",
  "XML",
  "TOML",
  "Markdown",
  "Properties",
  "PlainText",
  "SQL",
  "SQLite",
  "MariaDB",
  "MSSQL",
  "PostgreSQL",
  "CQL"
]

  const licenseOptions = [
    "MIT", "Apache 2.0", "GPL v3", "BSD 3-Clause", "ISC", "Unlicense", "Custom"
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Configuration Template</h1>
        <p className="text-muted-foreground">
          Create a blueprint that defines the structure, format, and available arguments for configuration files. Help developers write syntax-error-free configs quickly.
        </p>
      </div>

      {/* Split Layout - Overleaf Style */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[800px]">
        {/* Left Side - Template Configuration */}
        <div className="space-y-6 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Template Configuration</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Save Draft</Button>
              <Button size="sm" onClick={generateTemplate}>Generate</Button>
            </div>
          </div>

          {/* Template Basic Info */}
          <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Basic Information
          </CardTitle>
          <CardDescription>
            Define the basic structure and metadata for your configuration template blueprint.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name *</Label>
              <Input
                id="template-name"
                placeholder="e.g. config.conf, my.yml, settings.json"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-category">File Type *</Label>
              <Select value={templateFileType} onValueChange={setTemplateFileType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {templateCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="template-version">Version *</Label>
              <Input
                id="template-version"
                placeholder="e.g., 1.0.0"
                value={templateVersion}
                onChange={(e) => setTemplateVersion(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="template-description">Description *</Label>
            <Textarea
              id="template-description"
              placeholder="Describe what configuration files this template helps create, what fields and arguments it defines, and what validation rules it includes..."
              className="min-h-[100px]"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
              />
          </div>
        </CardContent>
      </Card>

          {/* Template Structure */}
          <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            Template Definition
          </CardTitle>
          <CardDescription>
            Define the structure, fields, validation rules, and format for your configuration template.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Template Fields ({templateBlocks.length})</div>
            <Button variant="outline" size="sm" onClick={addTemplateBlock}>
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </Button>
          </div>

          <div className="space-y-4">
            {templateBlocks.map((block) => (
              <div key={block.id} className="p-4 border rounded-lg space-y-4 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Field Definition</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTemplateBlock(block.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Field Name *</Label>
                    <Input
                      placeholder="e.g., name, port, enabled"
                      value={block.fieldName}
                      onChange={(e) => updateTemplateBlock(block.id, 'fieldName', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Field Type *</Label>
                    <Select
                      value={block.fieldType}
                      onValueChange={(value) => updateTemplateBlock(block.id, 'fieldType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="string">String</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                        <SelectItem value="select">Select (Options)</SelectItem>
                        <SelectItem value="array">Array</SelectItem>
                        <SelectItem value="object">Object</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    placeholder="Describe what this field is used for"
                    value={block.description}
                    onChange={(e) => updateTemplateBlock(block.id, 'description', e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Default Value</Label>
                    <Input
                      placeholder={
                        block.fieldType === 'boolean' ? 'true or false' : 
                        block.fieldType === 'number' ? '0, 8080, etc.' :
                        'Default value...'
                      }
                      value={block.defaultValue}
                      onChange={(e) => updateTemplateBlock(block.id, 'defaultValue', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-6">
                    <Switch
                      checked={block.required}
                      onCheckedChange={(checked) => updateTemplateBlock(block.id, 'required', checked)}
                    />
                    <Label>Required Field</Label>
                  </div>
                </div>

                {block.fieldType === 'select' && (
                  <div className="space-y-2">
                    <Label>Options (for Select type)</Label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add option..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                              addOptionToBlock(block.id, e.currentTarget.value.trim())
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                            if (input?.value.trim()) {
                              addOptionToBlock(block.id, input.value.trim())
                              input.value = ''
                            }
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {block.options.map((option, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {option}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => removeOptionFromBlock(block.id, index)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {templateBlocks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Code2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No template fields defined yet.</p>
              <p className="text-sm">Click "Add Field" to start building your template structure.</p>
            </div>
          )}
        </CardContent>
      </Card>

          {/* Template Settings */}
          <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share className="h-5 w-5" />
            Template Settings
          </CardTitle>
          <CardDescription>
            Configure validation rules, sharing permissions, and documentation for your template.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Strict Validation</Label>
              <div className="text-sm text-muted-foreground">
                Enforce all field requirements and validation rules
              </div>
            </div>
            <Switch checked={strictValidation} onCheckedChange={setStrictValidation} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Public Template</Label>
              <div className="text-sm text-muted-foreground">
                Make this template blueprint available to all developers
              </div>
            </div>
            <Switch checked={isPublic} onCheckedChange={setIsPublic} />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="license">License</Label>
            <Select value={license} onValueChange={setLicense}>
              <SelectTrigger>
                <SelectValue placeholder="Select license" />
              </SelectTrigger>
              <SelectContent>
                {licenseOptions.map((licenseOption) => (
                  <SelectItem key={licenseOption} value={licenseOption}>
                    {licenseOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="readme">Usage Documentation</Label>
            <Textarea
              id="readme"
              placeholder="Explain what configuration files this template helps create, how to use each field, common patterns, and validation rules..."
              className="min-h-[120px]"
              value={documentation}
              onChange={(e) => setDocumentation(e.target.value)}
              />
          </div>
        </CardContent>
      </Card>

        </div>

        {/* Right Side - Generated JSON Template */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Generated Template</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                if (generatedTemplate) {
                  navigator.clipboard.writeText(generatedTemplate)
                }
              }}>Copy JSON</Button>
            </div>
          </div>

          <Card className="h-full">
            <CardContent className="p-0">
              <div className="bg-muted/20 p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="font-mono text-sm">{templateName}</span>
                </div>
                <Badge variant="secondary">Live Preview</Badge>
              </div>
              <div className="p-4">
                <pre className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 overflow-auto text-sm font-mono min-h-[600px] max-h-[600px]">
                  <code className="text-slate-800 dark:text-slate-200">
                    {generatedTemplate || "Click 'Generate' to create your template JSON..."}
                  </code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share className="h-5 w-5" />
            Publish Template
          </CardTitle>
          <CardDescription>
            Review and publish your template to the community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 justify-center">
            <Button size="lg" className="flex-1 sm:flex-none">
              <Share className="h-4 w-4 mr-2" />
              Publish Template
            </Button>
            <Button variant="outline" size="lg">
              Save as Draft
            </Button>
            <Button variant="outline" size="lg">
              Test Template
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
