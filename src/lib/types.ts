export type Maybe<T> = T | undefined;

export type Teacher = {
  "id": number
  "name": string
  "loginId": string
}

export type Order = "ASC" | "DESC"

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>