export type LeadFormPayload = {
  name: string;
  company: string;
  contact: string;
  segment: string;
  message: string;
  consent: boolean;
};

export async function submitLead(endpoint: string, payload: LeadFormPayload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Lead submit failed.');
  }

  return response;
}
