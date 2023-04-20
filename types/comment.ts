export interface Comment {
  _id: string
  remark: string
  bookId: string
  createdAt: Date
  updatedAt: Date
}

export interface CommentAdd {
  remark: string
  bookId: string
}

export type Comments = Comment[] | undefined[]