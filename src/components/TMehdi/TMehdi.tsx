import type { HTMLAttributes } from 'react'

import { gql } from '@vtex/graphql-utils'
import { useQuery } from 'src/sdk/graphql/useQuery'

type TMehdiVariant =
  | {
      /**
       * The content for the h2 tag.
       */
      title: string
    }
  | {
      /**
       * The content for the h2 tag.
       */
      title: string
    }


export type TMehdiProps = TMehdiVariant


const query = gql`
  query CategoryTreeQuery {
    allStoreCollection(filter: { type: { eq: Department } }) {
      nodes {
        slug
        remoteId
        seo {
          title
        }
        childrenStoreCollection {
          slug
          seo {
            title
          }
          childrenStoreCollection {
            slug
            seo {
              title
            }
          }
        }
      }
    }
  }
`


function TMehdi({
  title,
}: TMehdiProps) {

  const { data, isValidating, error } = useQuery(query, {}, {})

  console.log("title: ", title)
  console.log("data: ", data)
  console.log("isValidating: ", isValidating)
  console.log("error: ", error)

  return (
    <div className="container">
      <>
        {title} {data}
        <br/>
      </>
    </div>
  )
}

export default TMehdi
