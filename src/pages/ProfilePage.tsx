import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { CUSTOMER_ID } from '../config';
import { GET_CUSTOMER, GetCustomerQuery, UPDATE_CUSTOMER, UpdateCustomerMutation } from '../graphql/customer';
import { PrimaryButton } from '../ui/Button';
import { SectionTitle } from '../ui/Typography';
import { Page } from '../ui/Layout';

type CustomerFormState = {
  name: string;
  surname: string;
  email: string;
  phone: string;
};

export const ProfilePage: React.FC = () => {
  const { data, loading } = useQuery<GetCustomerQuery>(GET_CUSTOMER, {
    variables: { id: CUSTOMER_ID },
  });

  const [updateCustomer, { loading: saving }] = useMutation<UpdateCustomerMutation>(UPDATE_CUSTOMER);

  const [form, setForm] = useState<CustomerFormState>({
    name: '',
    surname: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (data?.getCustomer) {
      const c = data.getCustomer;
      setForm({
        name: c.name ?? '',
        surname: c.surname ?? '',
        email: c.email ?? '',
        phone: c.phone ?? '',
      });
    }
  }, [data]);

  const handleChange =
    (field: keyof CustomerFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCustomer({
      variables: {
        id: CUSTOMER_ID,
        data: {
          name: form.name || null,
          surname: form.surname || null,
          email: form.email || null,
          phone: form.phone || null,
        },
      },
    });
  };

  if (loading && !data) return <div>Načítám osobní údaje…</div>;

  return (
    <Page>
      <SectionTitle>Osobní údaje</SectionTitle>

      <InfoBox>
        <InfoIcon>ℹ️</InfoIcon>
        <InfoText>
          Údaje se použijí v příštích rezervacích, které se tím zrychlí.
        </InfoText>
      </InfoBox>

      <Form onSubmit={handleSubmit}>
        <Label>
          Jméno
          <Input 
            value={form.name} 
            onChange={handleChange('name')}
            placeholder="Petr"
          />
        </Label>
        <Label>
          Příjmení
          <Input 
            value={form.surname} 
            onChange={handleChange('surname')}
            placeholder="Zákazník"
          />
        </Label>
        <Label>
          E-mail
          <Input
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="petr@gmail.com"
          />
        </Label>
        <Label>
          Telefon
          <PhoneGroup>
            {/* I did not implement country code selection because BE does not support it,
            I could get it from the phone number and join it again when saving */}
            <CountryCode>
              🇨🇿 +420
            </CountryCode>
            <PhoneInput 
              value={form.phone} 
              onChange={handleChange('phone')}
              placeholder="123 456 789"
            />
          </PhoneGroup>
        </Label>

        <PrimaryButton type="submit" disabled={saving}>
          {saving ? 'UKLÁDÁM…' : 'ULOŽIT'}
        </PrimaryButton>
        <ChangePasswordLink>Změnit heslo</ChangePasswordLink>
      </Form>
    </Page>
  );
};

const InfoBox = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(23, 166, 25, .25);
  border-radius: 8px;
  align-items: center;
`;

const InfoIcon = styled.span`
  font-size: 20px;
  flex-shrink: 0;
`;

const InfoText = styled.p`
  font-size: 16px;
  color: #000000;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: #555555;
`;

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid #BBBBBB;
  padding: 8px;
  font-size: 14px;
  color: #333333;
  
  &::placeholder {
    color: #888888;
  }
  
  &:focus {
    outline: none;
    border-color: #00A800;
  }
`;

const PhoneGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const CountryCode = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border: 1px solid #BBBBBB;
  border-radius: 4px;
  font-size: 14px;
  background: #ffffff;
  white-space: nowrap;
`;

const PhoneInput = styled(Input)`
  flex: 1;
`;

const ChangePasswordLink = styled.a`
  text-align: center;
  color: #00A800;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;