export type EducationEntry = {
  title: string
  institution: string
  year: string
  details: string
}

export type Quote = {
  text: string
  date?: string
  recipient?: string
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
  quotes?: Quote[]
  folder: string
  images: string[]
  videos?: string[]
}

export type Animal = {
  id: string
  name: string
  picture: string
  reason: string
}