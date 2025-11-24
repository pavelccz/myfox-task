import React from 'react';
import { styled, css } from 'styled-components';
import { formatDate, formatDateTime, formatPriceCZK } from '../../utils/formatters';
import { PrimaryButton, SecondaryButton } from '../../ui/Button';
import { DropdownMenu, MenuItemButton, MenuWrapper } from '../../ui/Menu';
import { Calendar, CalendarState } from '../../graphql/calendars';
import { usePhotoUrl } from "../../hooks/usePhotoUrl";
import { microSiteFormUrl } from '../../config';

interface ReservationCardProps {
  calendar: Calendar;
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({
  calendar,
  menuOpen,
  onToggleMenu,
}) => {
  // Pick first cart as main service for simplicity of this assignment
  const mainCart = calendar.carts?.[0];
  const item = mainCart?.item;

  const isOpen = calendar.state === CalendarState.Open;

  // Event image: first cart item picture → subject logo
  const pictureSecret = item?.picture?.secret ?? calendar.subject?.microsite?.logo?.secret;
  const imageSrc = usePhotoUrl(pictureSecret);

  const shop = calendar.shop;
  const subject = calendar.subject;

  const title = shop?.name ?? mainCart?.name ?? 'Rezervace služby';

  const addressParts = [
    shop?.address?.street,
    shop?.address?.city,
  ].filter(Boolean);
  const addressText = addressParts.join(', ');

  const phone = shop?.phone ?? '';

  const dateTimeLabel = formatDateTime(calendar.from);  
  const dateLabel = formatDate(calendar.from);

  const durationMinutes = item?.duration;

  // Total price from all carts
  const priceLabel = mainCart?.priceVat ? formatPriceCZK(mainCart.priceVat) : undefined;

  const handleCreateAnotherReservation = () => {
    if (!subject?.alias) return;
    const url = microSiteFormUrl(subject.alias);
    window.location.href = url;
  };

  // Simple Google Maps link
  const mapsUrl =
    addressText.length > 0
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          addressText
        )}`
      : undefined;

  return (
    <Card>
      <CardBody>
        {imageSrc ? (
          <LogoImage src={imageSrc} alt={title} />
        ) : (
          <LogoPlaceholder />
        )}

        <div>
          <CardTitle>{title}</CardTitle>

          {addressText && <MetaRow>{addressText}</MetaRow>}
          {phone && <MetaRow>tel {phone}</MetaRow>}

          {!isOpen && dateLabel && (
            <MetaRow>
              Navštívili jste {dateLabel}
            </MetaRow>
          )}

          {isOpen && item && (
            <ServiceName>{item.name}</ServiceName>
          )}

          {isOpen && dateTimeLabel && (
            <DateRow>
              {dateTimeLabel}
            </DateRow>
          )}

          {isOpen && (durationMinutes || priceLabel) && (
            <MetaRow>
              {durationMinutes && `${durationMinutes} minut`}
              {priceLabel && `${durationMinutes && ', '} ${priceLabel}`}
            </MetaRow>
          )}

          
          {isOpen ? (
            <ActionsRow>
              {mapsUrl ? (
                <SecondaryButton
                  as="a"
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Trasa
                </SecondaryButton>
              ) : (
                <SecondaryButton type="button">
                  Trasa
                </SecondaryButton>
              )}

              {phone ? (
                <SecondaryButton as="a" href={`tel:${phone}`}>
                  Zavolat
                </SecondaryButton>
              ) : (
                <SecondaryButton type="button">
                  Zavolat
                </SecondaryButton>
              )}

              <MenuWrapper>
                <SecondaryButton type="button" onClick={onToggleMenu}>
                  …
                </SecondaryButton>

                {menuOpen && (
                  <DropdownMenu>
                    <MenuItemButton onClick={handleCreateAnotherReservation}>
                      Vytvořit další rezervaci
                    </MenuItemButton>
                    <MenuItemButton>
                      Přidat do kalendáře
                    </MenuItemButton>
                    <MenuItemButton>
                      Přidat do kontaktů
                    </MenuItemButton>
                  </DropdownMenu>
                )}
              </MenuWrapper>
            </ActionsRow>
          ) : (
            <ActionsRow>
              <PrimaryButton type="button" onClick={handleCreateAnotherReservation}>
                Rezervovat
              </PrimaryButton>
            </ActionsRow>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

// Card layout

const Card = styled.article`
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #DDDDDD;
  box-shadow: 0px 0px 17px 3px #0000001A;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardBody = styled.div`
  display: flex;
  gap: 16px;
`;

// Logo styles

const logoStyles = css`
  width: 84px;
  height: 84px;
  border-radius: 8px;
  flex-shrink: 0;
`;

const LogoImage = styled.img`
  ${logoStyles}
  object-fit: cover;
`;

const LogoPlaceholder = styled.div`
  ${logoStyles}
  background: #BBBBBB;
`;

// Card text styles

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333333;
`;

const ServiceName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin-top: 16px;
`;

const DateRow = styled.div`
  font-size: 16px;
  color: #333333;
`;

const MetaRow = styled.div`
  font-size: 14px;
  color: #888888;
`;

// Actions styles

const ActionsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;
