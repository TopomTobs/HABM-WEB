export type EducationEntry = {
  title: string
  institution: string
  year: string
  details: string
}

export type Person = {
  id: string
  name: string
  role: string
  profileImage?: string
  summary: string
  education: EducationEntry[]
  skills: string[]
  highlights: string[]
  placeholders: string[]
}