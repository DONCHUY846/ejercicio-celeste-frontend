export interface Stats {
  total: number
  yes: number
  no: number
  yes_percent: number
}

export interface Pregunta {
  id: number
  pregunta: string
  id_evento: number
  stats?: Stats
}

export interface Evento {
  id: number
  fecha: string
  descripcion: string
  preguntas?: Array<Pregunta>
}

export interface VotePayload {
  pregunta_id: number
  respuesta: boolean
}

export interface VoteResponse {
  message: string
  results: {
    pregunta_id: number
    stats: Stats
  }
}
