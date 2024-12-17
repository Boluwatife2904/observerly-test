<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { VisXYContainer, VisAxis, VisBulletLegend, VisLine } from '@unovis/vue';
import type { BulletLegendItemInterface } from '@unovis/ts';

import { calculateAstronomicalObservations, type Observation } from '@/utils';
import { DEFAULT_LONGITUDE, DEFAULT_LATITUDE, MOON_COLOR, SUN_COLOR } from '@/utils/constants';

import IconsSearch from '@/components/IconSearch.vue';

const datetime = ref(new Date().toISOString().split('T')[0]);
const longitude = ref(0);
const latitude = ref(0);
const locationStatus = ref<'success' | 'error' | 'loading'>('loading');

const legend: BulletLegendItemInterface[] = [
  { name: 'Moon', color: MOON_COLOR },
  { name: 'Sun', color: SUN_COLOR },
];

const observations = computed(() =>
  calculateAstronomicalObservations(latitude.value, longitude.value, datetime.value),
);

const x = (d: Observation) => d.hour;
const y = [(d: Observation) => d.sunAltitude, (d: Observation) => d.moonAltitude];
const color = (d: Observation, i: number) => [SUN_COLOR, MOON_COLOR][i];

const setDefaultAltitudes = () => {
  longitude.value = DEFAULT_LONGITUDE;
  latitude.value = DEFAULT_LATITUDE;
  locationStatus.value = 'error';
};

onMounted(() => {
  // request for user location and use default longitude/latitude if that fails
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
        locationStatus.value = 'success';
      },
      () => {
        setDefaultAltitudes();
      },
    );
  } else {
    setDefaultAltitudes();
  }
});
</script>

<template>
  <main min-h-dvh flex flex-col gap="x-10 y-9 " bg="#080808" p="y-5 x-5 lg:x10">
    <h1 text="50px center white" font-600>The Astronomy</h1>

    <div
      v-if="locationStatus !== 'loading'"
      flex
      flex-col
      gap-2
      w-full
      max-w-564px
      items-start
      mx-auto
    >
      <label for="datetime" text="white sm" font="medium">Select Date</label>
      <input
        v-model="datetime"
        type="date"
        name="datetime"
        id="datetime"
        w-full
        px2
        py3
        outline-none
        text="sm #080808"
      />
    </div>

    <div
      v-if="locationStatus === 'loading'"
      flex
      flex-col
      items-center
      justify-center
      gap-5
      min-h-500px
    >
      <IconsSearch />
      <h1 text="white 24px" font-700>Getting your location.</h1>
      <p text="white base center" max-w-363px mx-auto>
        Please hold on while we try to get your location data. This should only take a few seconds.
      </p>
    </div>

    <div v-else flex gap-6 flex-col>
      <div flex items-center justify-between flex-wrap gap-3>
        <p text="sm white" font="italic" inline-flex items-center gap-2>
          <span>Longitude: {{ longitude }}°,</span>
          <span>Latitude: {{ latitude }}°</span>
        </p>
        <VisBulletLegend :items="legend" />
      </div>

      <VisXYContainer :data="observations" :height="560" :yDomain=[-90,90] >
        <VisLine :x :y :color />
        <VisAxis
          type="x"
          label="Hour of Day"
          :tickFormat="(value: number) => `${String(value).padStart(2, '0')}:00`"
        />
        <VisAxis type="y" label="Altitude (degrees)" />
      </VisXYContainer>
    </div>
  </main>
</template>

<style scoped></style>
