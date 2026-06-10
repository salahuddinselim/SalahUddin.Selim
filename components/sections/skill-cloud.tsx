"use client"

import { TagCloud } from "@/components/ui/tag-cloud"

interface SkillItem {
  name: string
  category: string
  initials: string
}

const skills: SkillItem[] = [
  { name: "Python", category: "Languages", initials: "PY" },
  { name: "Java", category: "Languages", initials: "JV" },
  { name: "C", category: "Languages", initials: "C" },
  { name: "C++", category: "Languages", initials: "CP" },
  { name: "PHP", category: "Languages", initials: "PH" },
  { name: "JavaScript", category: "Languages", initials: "JS" },
  { name: "HTML/CSS", category: "Languages", initials: "HC" },
  { name: "JavaFX", category: "Frameworks", initials: "JF" },
  { name: "Bootstrap", category: "Frameworks", initials: "BT" },
  { name: "SpeechRecognition", category: "Frameworks", initials: "SR" },
  { name: "Pyttsx3", category: "Frameworks", initials: "PT" },
  { name: "Arduino", category: "IoT", initials: "AR" },
  { name: "DS18B20", category: "IoT", initials: "D8" },
  { name: "pH Sensor", category: "IoT", initials: "PS" },
  { name: "Turbidity", category: "IoT", initials: "TB" },
  { name: "Ultrasonic", category: "IoT", initials: "US" },
  { name: "L298N", category: "IoT", initials: "L2" },
  { name: "Servo Motors", category: "IoT", initials: "SM" },
  { name: "MySQL", category: "Tools", initials: "MY" },
  { name: "Git", category: "Tools", initials: "GT" },
  { name: "GitHub", category: "Tools", initials: "GH" },
  { name: "IntelliJ IDEA", category: "Tools", initials: "IJ" },
  { name: "Arduino IDE", category: "Tools", initials: "AI" },
  { name: "VS Code", category: "Tools", initials: "VS" },
  { name: "Scene Builder", category: "Tools", initials: "SB" },
  { name: "OOP", category: "Tools", initials: "OO" },
  { name: "Multithreading", category: "Tools", initials: "MT" },
  { name: "Socket Programming", category: "Tools", initials: "SP" },
  { name: "DSA", category: "Tools", initials: "DS" },
  { name: "MVC", category: "Tools", initials: "MV" },
  { name: "REST APIs", category: "Tools", initials: "RA" },
]

const categoryColors: Record<string, string> = {
  Languages: "#00D9FF",
  Frameworks: "#8B5CF6",
  IoT: "#22C55E",
  Tools: "#F97316",
}

interface SkillCloudProps {
  activeCategory?: string | null
}

export function SkillCloud({ activeCategory = null }: SkillCloudProps) {
  return (
    <TagCloud
      items={skills}
      categoryColors={categoryColors}
      activeCategory={activeCategory}
    />
  )
}
