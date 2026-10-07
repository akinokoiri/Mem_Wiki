### Working in Beast Form {#兽化工作效果}

- In [兽化], you can perform **`Chop / Mine / Hammer / Dig`** tasks unarmed.
- Each `Chop / Mine / Hammer` action has **40%** of normal work effectiveness; this is separate from action frequency.
- Each successful work action consumes `Hunger`. Canceled or unsuccessful chopping, mining, and hammering consume no Hunger.
- Chopping: <DST icon="hunger">-0.05</DST>; mining/hammering: <DST icon="hunger">-0.25</DST>; digging: <DST icon="hunger">-1</DST>.
- `Chop / Mine / Hammer` have a fixed **7-frame** interval and perform the work on frame **3** after starting. At **30 frames per second**, this is about **4.29 actions/sec**, unaffected by Classic / Modern combat mode.
- Moving can cancel the current action but cannot bypass the **7-frame** interval. An early input for the next action waits until the interval ends.
- `Dig` remains a separate **3-second** action and does not use this timing. Gathering and picking up items also use their own timing.
- Pressing Space prioritizes a closer chopping, mining, or hammering target within **3 units** over a farther pickup or gathering target. Equal distances retain the original priority.


### Commanding the Body to Work in Beast Form {#兽化指挥身体工作}

- While simultaneously in [兽化] and [分头行动] (*excluding the special split used by Hands-On*), you can command the body to work.
- Hovering over an eligible entity displays [去把这个当目标！].
- Performing the action makes the body do the corresponding work on it.
- The body can perform **`Pick / Pick Up / Dig / Chop / Mine / Hammer`** tasks.
- The body's `Chop / Mine / Hammer` actions also have a fixed **7-frame** interval, perform work on frame **3**, and run at about **4.29 actions/sec**. Classic / Modern combat mode does not change this, and canceling actions does not speed it up. Digging, gathering, and picking up items use their own timing.
- It then performs the same work on entities of the **same type** within its range.
- While the body is working, right-click yourself and perform [别捣鼓了，回来！] to make it stop.
- For commanded work, the body's **maximum operating range**, which varies with the player's `Sanity`, is **twice** its default range.

### Faster Jumps {#跳跃加速}

- [跳跃] airtime is reduced by **40%**; travel speed over the same distance increases accordingly.
- This also shortens the uninterruptible period, but makes [跳跃] more responsive.
- In some situations, covering the same distance takes less time than holding `W` to run.

### Food Hole Duration {#土坑持续时间}

- Holes dug with [藏食物] last up to 2 days instead of 1 day.
- Does not affect holes dug before learning the skill.
