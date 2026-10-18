import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateFloatingParticles,
  getNextStep,
  getStepTitle,
  LOVE_MESSAGES,
  DEFAULT_PHOTOS,
  DEFAULT_LETTER
} from './cardUtils.ts';

test('generateFloatingParticles generates requested count and valid structure', () => {
  const particles = generateFloatingParticles(20);
  assert.equal(particles.length, 20);

  const photoParticles = particles.filter(p => p.type === 'photo');
  const textParticles = particles.filter(p => p.type === 'text');
  const heartParticles = particles.filter(p => p.type === 'heart' || p.type === 'petal');

  assert.ok(photoParticles.length > 0, 'Should include photo particles');
  assert.ok(textParticles.length > 0, 'Should include text particles');
  assert.ok(heartParticles.length > 0, 'Should include heart or petal particles');

  for (const p of particles) {
    assert.ok(p.leftPercent >= 0 && p.leftPercent <= 100, 'leftPercent must be within 0-100%');
    assert.ok(p.durationSec > 0, 'durationSec must be positive');
    assert.ok(p.delaySec >= 0, 'delaySec must be non-negative');
    if (p.type === 'photo') {
      assert.ok(p.photoUrl && p.photoUrl.startsWith('http'), 'photoUrl must be present');
    }
  }
});

test('step transitions advance correctly from step 1 through 5', () => {
  assert.equal(getNextStep(1), 2);
  assert.equal(getNextStep(2), 3);
  assert.equal(getNextStep(3), 4);
  assert.equal(getNextStep(4), 5);
  assert.equal(getNextStep(5), 5, 'Should not exceed step 5');
});

test('getStepTitle returns meaningful labels', () => {
  assert.match(getStepTitle(1), /Hộp quà/);
  assert.match(getStepTitle(2), /Bó hoa/);
  assert.match(getStepTitle(5), /Hồng Nhung/);
});

test('letter structure contains essential love letter components', () => {
  assert.ok(DEFAULT_LETTER.salutation.includes('Hồng Nhung'));
  assert.ok(DEFAULT_LETTER.body.length >= 3);
  assert.ok(DEFAULT_LETTER.closing.length > 0);
  assert.ok(DEFAULT_LETTER.signature.includes('❤️'));
});
