import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { LIST_CALENDARS, ListCalendarsQuery } from '../../graphql/calendars';
import { CUSTOMER_ID } from '../../config';
import { ReservationCard } from './ReservationsCard';
import { SectionTitle } from '../../ui/Typography';
import { Page } from '../../ui/Layout';
import { splitCalendars } from '../../utils/splitCalendars';

export const ReservationsPage: React.FC = () => {
  const { data, loading, error } = useQuery<ListCalendarsQuery>(
    LIST_CALENDARS,
    {
      variables: { customerId: CUSTOMER_ID },
    }
  );

  // ID of the reservation whose menu is open
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Split calendars into current and again
  const calendars = data?.listCalendars ?? [];

  const { current, again } = useMemo(
    () => splitCalendars(calendars),
    [calendars]
  );

  if (loading && !data) {
    return <Page>Načítám rezervace…</Page>;
  }

  if (error) {
    return <Page>Došlo k chybě při načítání rezervací.</Page>;
  }

  return (
    <Page>
      {current.length > 0 && (
        <Section>
          <SectionTitle>Moje rezervace</SectionTitle>
          <CardList>
            {current.map((calendar) => (
              <ReservationCard
                key={calendar.id}
                calendar={calendar}
                menuOpen={openMenuId === calendar.id}
                onToggleMenu={() =>
                  setOpenMenuId((prev) =>
                    prev === calendar.id ? null : calendar.id
                  )
                }
              />
            ))}
          </CardList>

          {current.length === 0 && (
            <EmptyState>Nemáte žádné rezervace.</EmptyState>
          )}
        </Section>
      )}

      {again.length > 0 && (
        <Section>
          <SectionTitle>Objednejte se znovu</SectionTitle>
          <CardList>
            {again.map((calendar) => (
              <ReservationCard
                key={calendar.id}
                calendar={calendar}
                menuOpen={openMenuId === calendar.id}
                onToggleMenu={() =>
                  setOpenMenuId((prev) =>
                    prev === calendar.id ? null : calendar.id
                  )
                }
              />
            ))}
          </CardList>
        </Section>
      )}
    </Page>
  );
};

// Layout

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// Empty state message

const EmptyState = styled.div`
  margin-top: 24px;
  font-size: 14px;
  color: #6b7280;
`;
