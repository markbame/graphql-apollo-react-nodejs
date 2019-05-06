import {graphql,
  GraphQLObjectType , GraphQLString,
  GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull
} from 'graphql'
import _ from 'lodash'

import Book from '../models/book'
import Author from '../models/author'

const BookType = new GraphQLObjectType ({
  name: 'Book',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType ({
  name: 'Author',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({authorId: parent.id})
      }
    }
  })
})

const Mutation = new GraphQLObjectType ({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve(parent, args) {
        const {name, age} = args
        const author = new Author({
          name,
          age
        })
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        genre: {
          type: new GraphQLNonNull(GraphQLString)
        },
        authorId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parent, args) {
        const {name, genre, authorId} = args
        const book = new Book({
          name,
          genre,
          authorId
        })
        return book.save()
      }
    }
  }
})

const RootQuery = new GraphQLObjectType ({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
          id: {
            type: GraphQLID
          }
      },
      resolve(parent, args) {
        return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: {
          id: {
            type: GraphQLID
          }
      },
      resolve(parent, args) {
        return Author.findById(args.id)
      }
    },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find()
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find()
      }
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
