<script>
export let text
export let href
export let icon
import { PenSquare, GitBranchPlus, PocketKnife, Image } from 'lucide-svelte'
const iconComponents = {
  PenSquare,
  GitBranchPlus,
  PocketKnife,
  Image
};
const IconComponent = iconComponents[icon];
</script>

<a href={href} class="text-sm font-semibold leading-6 text-gray-900"><svelte:component this={IconComponent} class={"inline mr-1 relative -top-[2px]"} />{text}</a>