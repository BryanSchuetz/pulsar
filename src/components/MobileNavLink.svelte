<script>
export let text
export let href
export let icon
import { PenSquare, GitBranchPlus, PocketKnife, Music4 } from 'lucide-svelte'
const iconComponents = {
  PenSquare,
  GitBranchPlus,
  PocketKnife,
  Music4
};
const IconComponent = iconComponents[icon];
</script>

<a href={href} class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"><svelte:component this={IconComponent} class={"inline mr-1 relative -top-[2px]"}/>{text}</a>
