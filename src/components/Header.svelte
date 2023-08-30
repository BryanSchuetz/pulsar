<script>
import { BadgeCheck } from 'lucide-svelte'
import { Hamburger } from 'svelte-hamburgers'
import NavLink from './NavLink.svelte'
import MobileNavLink from './MobileNavLink.svelte'
import { fade } from 'svelte/transition';
export let links
let open
</script>

<header class="bg-white">
  <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div class="flex lg:flex-1">
      <a href="#" class="-m-1.5 p-1.5">
        <span class="sr-only">Your Boy</span>
        <img class="h-16 w-auto rounded-md" src="avatar.png" alt="Your Boy">
        <BadgeCheck color="white" fill="#7F69F5" class="relative -top-3 left-[55px]" />
      </a>
    </div>
    <div class="flex lg:hidden z-[11]">
      <Hamburger bind:open --color="#7F69F5" --layer-spacing="7px" --layer-height="1.9px"/>
    </div>
    <div class="hidden lg:flex lg:gap-x-12">
      {#each links.data as link }
      <NavLink icon={link.icon} text={link.name} href={link.href} />
      {/each}
    </div>
    <div class="hidden lg:flex lg:flex-1 lg:justify-end">
      <a href="#" class="text-sm font-semibold leading-6 text-gray-900"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bike"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg> <span aria-hidden="true"></span></a>
    </div>
  </nav>
  <!-- Mobile menu, show/hide based on menu open state. -->
  {#if open }
  <div class="lg:hidden" role="dialog" aria-modal="true" in:fade={{ delay: 50 }} out:fade>
    <!-- Background backdrop, show/hide based on slide-over state. -->
    <div class="fixed inset-0 z-10"></div>
    <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      <div class="flex items-center justify-between smmd:hidden">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Boy</span>
          <img class="h-16 w-auto rounded-md" src="avatar.png" alt="Your Boy">
          <BadgeCheck color="white" fill="#7F69F5" class="relative -top-3 left-[55px]" />
        </a>
      </div>
      <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-gray-500/10">
          <div class="space-y-2 py-6">
            {#each links.data as link }
            <MobileNavLink icon={link.icon} text={link.name} href={link.href} />
            {/each}
          </div>
          <div class="py-6">
            <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bike"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/if}
</header>