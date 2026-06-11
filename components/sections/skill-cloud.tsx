"use client"

import { TagCloud } from "@/components/ui/tag-cloud"

interface SkillItem {
  name: string
  category: string
  initials: string
  iconName?: string
}

const skills: SkillItem[] = [
  { name: "Python", category: "Languages", initials: "PY", iconName: "python" },
  { name: "Java", category: "Languages", initials: "JV", iconName: "java" },
  { name: "C", category: "Languages", initials: "C" },
  { name: "C++", category: "Languages", initials: "CP", iconName: "cpp" },
  { name: "PHP", category: "Languages", initials: "PH", iconName: "php" },
  { name: "JavaScript", category: "Languages", initials: "JS", iconName: "javascript" },
  { name: "HTML/CSS", category: "Languages", initials: "HC", iconName: "html5" },
  { name: "JavaFX", category: "Frameworks", initials: "JF" },
  { name: "Bootstrap", category: "Frameworks", initials: "BT", iconName: "bootstrap" },
  { name: "SpeechRecognition", category: "Frameworks", initials: "SR" },
  { name: "Pyttsx3", category: "Frameworks", initials: "PT" },
  { name: "Arduino", category: "IoT", initials: "AR", iconName: "arduino" },
  { name: "DS18B20", category: "IoT", initials: "D8", iconName: "iot" },
  { name: "pH Sensor", category: "IoT", initials: "PS", iconName: "iot" },
  { name: "Turbidity", category: "IoT", initials: "TB", iconName: "iot" },
  { name: "Ultrasonic", category: "IoT", initials: "US", iconName: "iot" },
  { name: "L298N", category: "IoT", initials: "L2", iconName: "iot" },
  { name: "Servo Motors", category: "IoT", initials: "SM", iconName: "iot" },
  { name: "MySQL", category: "Tools", initials: "MY", iconName: "mysql" },
  { name: "Git", category: "Tools", initials: "GT", iconName: "git" },
  { name: "GitHub", category: "Tools", initials: "GH", iconName: "github" },
  { name: "IntelliJ IDEA", category: "Tools", initials: "IJ", iconName: "intellij" },
  { name: "Arduino IDE", category: "Tools", initials: "AI", iconName: "arduino" },
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
