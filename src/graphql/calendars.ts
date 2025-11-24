import { gql } from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export type CalendarState = 'Open' | 'Paid' | 'Canceled' | 'Storno' | 'Test';

export enum CalendarStateEnum {
  Open = 'Open',
  Paid = 'Paid',
  Canceled = 'Canceled',
  Storno = 'Storno',
  Test = 'Test',
}

export interface Address {
  street?: string | null;
  city?: string | null;
}

export interface Shop {
  name: string;
  phone?: string | null;
  address?: Address | null;
}

export interface File {
  secret: string;
}

export interface Microsite {
  logo?: File | null;
}

export interface Subject {
  alias: string;
  microsite?: Microsite | null;
}

export interface Item {
  name: string;
  duration?: number | null;
  picture?: File | null;
}

export interface Cart {
  name: string;
  priceVat?: number | null;
  item?: Item | null;
}

export interface Calendar {
  id: string;
  from?: string | null;
  state: CalendarState;
  shop?: Shop | null;
  subject?: Subject | null;
  carts?: Cart[] | null;
}

export interface ListCalendarsQuery {
  listCalendars: Calendar[];
}

export interface ListCalendarsVariables {
  customerId: string;
}

// I use one query to list calendars excluding canceled ones, because in this case it's more efficient
// than doing two separate calls on the same page.
export const LIST_CALENDARS: TypedDocumentNode<
  ListCalendarsQuery,
  ListCalendarsVariables
> = gql`
  query ListCalendars($customerId: String!) {
    listCalendars(
      where: {
        customers: { some: { id: { equals: $customerId } } }
        state: { notIn: [Canceled] }
      }
      orderBy: { from: ASC }
    ) {
      id
      from
      state
      shop {
        name
        phone
        address {
          street
          city
        }
      }
      subject {
        alias
        microsite {
          logo {
            secret
          }
        }
      }
      carts {
        name
        priceVat
        item {
          name
          duration
          picture {
            secret
          }
        }
      }
    }
  }
`;
