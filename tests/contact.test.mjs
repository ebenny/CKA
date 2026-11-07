import test from 'node:test';
import assert from 'node:assert/strict';
import { contact } from '../src/contact.js';

test('WhatsApp uses the user-supplied international number without punctuation', () => {
  assert.equal(contact.whatsappNumber, '+2348132566201');
  assert.equal(contact.whatsappDisplay.replace(/\s/g, ''), contact.whatsappNumber);
  assert.equal(contact.whatsappUrl, `https://wa.me/${contact.whatsappNumber.slice(1)}`);
});

test('social links preserve the supplied page/profile identities', () => {
  const facebook = new URL(contact.facebookUrl);
  assert.equal(facebook.origin, 'https://www.facebook.com');
  assert.equal(facebook.pathname, '/profile.php');
  assert.equal(facebook.searchParams.get('id'), '100076036761505');
  const instagram = new URL(contact.instagramUrl);
  assert.equal(instagram.origin, 'https://www.instagram.com');
  assert.equal(instagram.pathname, '/coding_kids_africa/');
  assert.equal(instagram.search, '');
});
