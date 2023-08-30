<script>
export let icon
export let text
export let href
import { PenSquare, GitBranchPlus, PocketKnife, Image } from 'lucide-svelte'
</script>

<a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
{#if icon == 'PenSquare'}
  <PenSquare class="inline -top-[1px] relative mr-1" />
  {:else if icon == 'Image'}
  <Image class="inline -top-[1px] relative mr-1" />
  {:else if icon == 'GitBranchPlus'}
  <GitBranchPlus class="inline -top-[1px] relative mr-1" />
  {:else if icon == 'PocketKnife'}
  <PocketKnife class="inline -top-[1px] relative mr-1" />
{/if}
{text}</a>