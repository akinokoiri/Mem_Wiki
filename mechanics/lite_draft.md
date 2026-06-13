# 「省流版」模组人物介绍

<HighlightCard>
  <template #title>玩法特色与避雷</template>
  <template #subtitle>“先在这里给大伙交个底，免得订阅后觉得货不对板。” </template>
  <template #pros>
    <ul>
      <li><strong>“野兽极速” —— 极其丝滑的跑图与生存体验</strong>：开局自带 35% 移速（相当于白送步行手杖）且能直接越墙，撕咬攻速极快。免疫食物负面效果，地上捡起怪物肉、生肉就能塞嘴里。两者结合，前期就能在地面上以战养战，一直战斗一直爽。</li>
      <li><strong>“见招拆招” —— 拒绝站桩的交互式 Boss 战</strong>：Boss 的攻略战中，不应该只有获得战利品的那一刻才有快感。在与本模组寄生 Boss 的对决中，你将从与 Boss 的每一次见招拆招和战斗演出中获得乐趣：或许是操控角色在虚影轰炸区的封锁中闪转腾挪并予以反击，亦或是透过荒尹沐战中的恐怖滤镜获得心惊肉跳的体验。</li>
      <li><strong>“机制咬合” —— 用巧劲而非数值站桩硬刚</strong>：角色的身板脆弱可以通过有趣的套路来对冲。比如怨灵形态可以骑牛共享血量；打 Boss 时可以利用机制引诱天基激光进行“借刀杀人”。比起单纯的拼数值对砍，玩起来更具策略快感。</li>
      <li><strong>“化敌为友” —— 将 Boss 转换为随从</strong>：击败专属 Boss 并收服为随从后，把它们曾经用来对付你的招式，转而用在其他 Boss 身上吧！</li>
    </ul>
  </template>
  <template #cons>
    <ul>
      <li><strong>为了平衡而妥协的“拧巴操作”</strong>：坦白说，由于作者的设计水平与平衡把控力有限，为了不让角色超标，我做了一些“套娃”式的限制（例如用机制 B 和 C 来约束机制 A）。这导致你在处理一些简单小事时，也必须频繁切换形态、更换项圈，游玩时可能会产生“折腾半天还不如常规角色直接拿火腿棒砍”的累赘感。作者目前正在努力优化，尽可能精简冗余的联动。</li>
      <li><strong>极其脆弱的生存容错率</strong>：怨灵形态、分头行动等机制带有极高的暴毙惩罚。稍微手抖或者网络卡顿就可能当场送命，对于操作有很高的要求，容错率相当低。</li>
      <li><strong>开发资源限制带来的美术短板</strong>：由于缺少美术资源，加之作者想象力有限，部分动作和技能特效稍微质朴，许多机制或物品未能给玩家带来足够直白的视觉冲击，对此深感遗憾。</li>
    </ul>
  </template>
</HighlightCard>


## 我能在模组中获得什么？又会付出什么代价？

<MechanicCard title="人物常驻：兽化形态" icon="beast" subtitle="按 <code>V</code> 进入的常驻人物形态">
  <template #pros>

  - **高机动** +35% 移动速度，相当于移动的 `卵石路` Plus。
  - **跨越地形** 按 `R` 键跨越地形和障碍，不惧 `骨牢` 和 `梦魇城墙`。
  - **高攻速** 3.75/s 的高攻速，+0.3 攻击距离。比常态多 2 倍甚至 3 倍的攻击机会。
  - **胡吃海喝** 免疫食物的三维惩罚，吃 `怪物肉`、`生肉`、`蘑菇` 等食物不会受到直接惩罚。
  - **维生基础** +65 减伤；+50% 防水；+120 保暖；<DST icon="sanity">+3.3/60</DST>。天生能抵御一定的环境影响。

  </template>
  <template #cons>

  - **门票** 开启和关闭兽化会消耗部分 [饱食度] 和 [精神值]。
  - **高饱食消耗** 2.5 倍的 [饱食度] 消耗，<DST icon="hunger">-187.5/天</DST>。
  - **无法穿戴装备** 背包、衬衫、部分开放式头盔以外的装备无法装备。
  - **食物中毒** 吃负面食物低概率减少少许三维，并被施加 [极限催眠]。

  </template>
</MechanicCard>

<MechanicCard title="人物常驻：怨灵形态" icon="ghost" subtitle="脱下 <code>封印项圈</code> 进入的常驻人物状态">
  <template #pros>

  - **极限输出** [理智值] 越低，造成的伤害倍率越高。
  - **备用血条** 致命伤害优先扣除 [灵魂值] 与 [理智值]，提升容错。
  - **快速治愈** 攻击命中扣除 [灵魂值] 或 [理智值] 恢复 [生命值]。
  - **坐骑共享** 驯化战牛可享受同等攻击加成，利用高血量对冲易伤。

  </template>
  <template #cons>

  - **极度脆皮** 默认上限<DST icon="health">75</DST>，“一麦”脆皮。
  - **易伤诅咒** [理智值] 越低，受到的伤害同步提高。
  - **失去理智** 持续性流失理智，<DST icon="sanity">-60/60</DST>。

  </template>
</MechanicCard>

<MechanicCard title="人物常驻：死亡与重生" icon="corpse" subtitle="伴随玩家整个存档的复活系统">
  <template #pros>

  - **随时复活** 死亡留下[芒芒的尸体]，可以立刻原地作祟尸体复活。
  - **高效探图** 鬼魂状态可以探开未查明的区域，且移动速度 +200%。<br>学习<DST icon="mem_skill_instinct_teleport">落叶归根</DST>还能死后传送。
  - **再一次的机会** [死亡回归]复活不怕复活即死，还能自动拾取装备大幅提高提速。
  - **主动死亡** 可以用[灵魂出窍]主动死亡，主动死亡后再复活的减益很少。
  
  </template>
  <template #cons>

  - **复生虚弱** 被动死亡的复活时，会带有永久的负面效果，降低属性并持续减少[生命值]，需要吃`告密的心`解除。
  - **诅咒叠加** 复活会根据死亡地点的距离来减少三维上限，虽然能自动回复但需要较长时间。
  - **创世七天** [死亡回归]有七天冷却。

  </template>
</MechanicCard>

<MechanicCard title="模组武器：电锯惊魂" icon="dj" subtitle="特殊武器">
  <template #pros>

  - **位面强化** 可被多次升级，升级满后 **位面伤害** 占比极高，对于月后环境有较强适应性。
  - **分解肉类** 将 `大肉` 转换为 `小肉`，换蛋、换金子、填充料理高效利用。
  - **战斗连击** 开启 [电锯轰鸣] 持续提升伤害，开启 [刻印形态] 每隔一段时间造成大伤害。

  </template>
  <template #cons>

  - **成型困难** 对比同时期武器表现一般，需要大后期才能有完全发挥。

  </template>
</MechanicCard>

<MechanicCard title="模组随从：友善的芒伊月" icon="mem_yue_pet" subtitle="自身尸体衍生出的更灵活的随从">
  <template #pros>

  - **以一当十** 击杀刷新攻击冷却，且攻击附带控场恐慌效果；对梦魇生物及常规杂兵降维打击。
  - **轻装随从** 移动速度较高，且可随手收入背包，免去路上招惹仇恨。
  - **阵营协同** 解锁 [本源协调] 后，能为跟随自己的随从都将获得 20% 的阵营减伤/增伤加成。
  - **省心安心** 战斗时会智能风筝，且治疗道具非常廉价。基本不用担心其会死亡的问题。
  - **负面免疫** 免疫冰冻/催眠/燃烧/电击，面对会施加这些效果的Boss时有很强的抵抗力。

  </template>
  <template #cons>

  - **Boss解锁** 必须先攻略人形 Boss [芒伊月] 才能复活随从。
  - **单体偏弱** 面对免控的单体 Boss 时总 DPS 较低，且攻击一次后有较长虚弱期。
  - **精英主义** 每个世界最多存在两只，无法形成规模族群。

  </template>
</MechanicCard>

<MechanicCard title="模组随从：友善的荒尹沐" icon="shadowmem_pet" subtitle="自身尸体衍生出的更笨重的随从">
  <template #pros>

  - **高效工作** 自主召唤分身砍树/采矿等工作，比`麦斯威尔`的影子效率更高，能做的事情也更多。
  - **单体特攻** 影子针对单体 Boss 输出效率极高（如月后三王）。
  - **阵营协同** 解锁 [本源协调] 后，能为跟随自己的随从都将获得 20% 的阵营减伤/增伤加成。
  - **负面免疫** 免疫冰冻/催眠/燃烧/电击，面对会施加这些效果的Boss时有很强的抵抗力。

  </template>
  <template #cons>

  - **Boss解锁** 必须先攻略人形 Boss [荒尹沐] 才能复活随从。
  - **操作繁琐** 召唤分身工作状态的操作不如`麦斯威尔`省事。
  - **重装随从** 无法收入背包，且自身移速较低，长距离移动容易脱队。
  - **协同限制** 随从会紧贴自身，玩家上前战斗随从容易挨打。要完全发挥影子战斗力，玩家自身需要拉开距离。
  - **精英主义** 每个世界最多存在两只，无法形成规模族群。

  </template>
</MechanicCard>

---

## 角色开局思路

::: info 💡 声明
“嘿，我不觉得作者教玩家怎么打游戏是好行为。但如果你需要一些建议，我的确可以给出一点。”
:::

<InteractiveTimeline>
  <template #day1>
    <h3>🌱 开局 Day 1：加点与探图</h3>
    <ul>
      <li><strong>加点思路</strong>：除了 <DST icon="mod">封印技能</DST> 都可以点，建议点出<DST icon="mem_skill_soul_hand">顷刻炼化</DST>和<DST icon="mem_skill_instinct_beastly">野兽体质</DST>。</li>
      <li><strong>鬼魂探图</strong>：开局立刻使用<DST icon="key">灵魂出窍</DST>主动死亡，利用鬼魂状态的 200% 加速和无视地形的优点，获得<code>月岛</code>的位置，最好还有<code>猴岛</code>、<code>垃圾堆</code>的位置。</li>
    </ul>
    <p class="boss-alert-tucao">
      <strong>补充</strong>：如果你关闭了<DST icon="mod">技能觉醒</DST>，那么请务必点出<DST icon="mem_skill_soul_light">彼世的光芒</DST>和<DST icon="mem_skill_soul_split">四象离魂</DST>，这对你探图很有作用。
    </p>
  </template>
  
  <template #early>
    <h3>🍖 前期生存：远古</h3>
    <ul>
      <li><strong>核心任务</strong>：训一头牛或前往<code>垃圾堆</code>获取几个<code>废料</code>后清理<code>远古</code>，获得<code>唤星者法杖</code>和<code>魔光护符</code>。</li>
      <li><strong>以战养战</strong>：利用<DST icon="beast">兽化</DST>高机动和免疫食物负面的特点，迅速收集基础材料。以战养战，靠击杀<code>猪人</code>、<code>蜘蛛</code>、采<code>蘑菇</code>获取大量食物，以维持<DST icon="beast">兽化</DST>。在预定要建家的地方建造一个<code>帐篷</code>后准备下洞。</li>
      <li><strong>二次探图</strong>：下洞后，立即<DST icon="key">灵魂出窍</DST>主动死亡，探出<code>远古</code>和<code>迷宫</code>的位置，最好还能找一下<code>蓝蘑菇林</code>和<code>中庭</code>，摸清地形。探完后，在鬼魂状态回到地面作祟<code>帐篷</code>将其转换为<DST icon="hlxz">狐狸的凶宅</DST>，然后回到地下。</li>
      <li><strong>探索远古</strong>：利用<DST icon="key">藏食物</DST>延长食物保质期，用<DST icon="beast">兽化</DST>清杂，<code>废料</code>收买<code>发条主教</code>清理<code>远古</code>。或者开<DST icon="ghost">怨灵</DST>训战牛清理<code>远古</code>。尽可能多获取<code>噩梦燃料</code>。</li>
      <li><strong>暗项圈准备</strong>：<DST icon="collar-lv4-an">暗项圈</DST>配合<DST icon="mem_skill_body_numb">逐渐麻木</DST>是中期回复<DST icon="soul">灵魂值</DST>的好手。为了制作它，尽量在21天前击杀<code>梦魇疯猪</code>后上来准备打<code>暗影三棋子</code>，别忘了预留几天搬雕像的时间。</li>
    </ul>
  </template>

  <template #mid>
    <h3>🌀 中期思路：自给自足</h3>
    <ul>
      <li><strong>核心任务</strong>：尽早获得<code>启迪之冠</code>和<DST icon="collar-lv4-yue">月项圈</DST>，实现<DST icon="sanity">理智值</DST>的自给自足。</li>
      <li><strong>永动机</strong>：<DST icon="collar-lv4-an">暗项圈</DST>和<DST icon="collar-lv4-yue">月项圈</DST>交替戴可以永动维持<DST icon="sanity">理智值</DST>和<DST icon="soul">灵魂值</DST>。而<DST icon="collar-lv4-yue">月项圈</DST>需要<code>注能玻璃碎片</code>，为此需要尽快进入月后。</li>
      <li><strong>石果和干海带</strong>：<code>月岛</code>的<code>石果</code>解决<DST icon="beast">兽化</DST>的<DST icon="hunger">饱食度</DST>问题，<code>月岛</code>的<code>海带</code>晾干后解决<DST icon="ghost">怨灵</DST>的<DST icon="sanity">理智值</DST>问题。多早上<code>月岛</code>，多早实现资源自由。</li>
      <li><strong>寄生Boss</strong>：新增加的<DST icon="shadowaligned">位面寄生</DST>无需位面后触发，在中期甚至前期你就可以依靠<DST icon="beast">兽化</DST>尝试在暴动期间制作一具<DST icon="corpse">芒芒的尸体</DST>，去攻略<DST icon="shadowmem">荒尹沐</DST>，获得类似<code>麦斯威尔</code>召唤<code>暗影傀儡</code>的能力。</li>
    </ul>
    <p class="boss-alert-tucao">
      <strong>补充</strong>：越早获得<DST icon="mod">友善随从</DST>，越早享受，大后期资源溢出用不上了再获得它们不是亏了吗？前中期就可以尝试攻略它们的boss。
    </p>
  </template>

  <template #late>
    <h3>🌋 后期思路</h3>
    <p class="boss-alert-tucao">
      <strong>碎碎念</strong>：后期能有什么思路？后期哪轮得到我来指指点点（笑）。
    </p>
  </template>
</InteractiveTimeline>

---

## Boss 简略攻略指南

::: info 💡 声明
“也许自己探索 Boss 的机制会更有乐趣，但为了避免初见杀，这边也给出一点建议。”
:::

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
  <div>
    <BossCard theme="moon" keyAction="🔑 核心要诀：别贪">
      <template #title>
        <DSTIcon icon="yue" /> 芒伊月
      </template>
      <ul>
        <li><strong>P1阶段</strong>：如果没有随机到<DST icon="mod">月光龙鳞甲·启迪</DST>，可以在它攻击冷却时多贪几刀。被锁定后，尝试朝着远离<DST icon="yue">芒伊月</DST>的位置走，最后一个<DST icon="atk">虚影轰炸区</DST>生成后，往回走开始输出。或者引诱<DST icon="yuebeam">月能激光</DST>打在<DST icon="yue">芒伊月</DST>身上，伤害不比自己打几刀低。</li>
        <li><strong>P2阶段</strong>：别贪，虚弱状态固定 10 秒。宁愿少打几刀也别贪，容易被一波带走。尝试引诱其吃到<DST icon="tenkibeam">天基激光</DST>。针对其穿戴<code>荆棘茄甲</code>的恶心情况，这是不重ROLL装备的唯一破局法。别担心，<DST icon="tenkibeam">天基激光</DST>扫射速度并不快。</li>
        <li><strong>濒死</strong>：<DST icon="tenkibeam">天基激光</DST>出现时，不要早早地跑开，这样会把<DST icon="yue">芒伊月</DST>吸引走导致其吃不到激光。</li>
      </ul>
      <template #tucao>
        <strong>补充</strong>：最好准备上<code>瞬移法杖</code>。这是兜底的脱身手段，为了不被一套带走以及引诱其吃<DST icon="tenkibeam">天基激光</DST>。
      </template>
    </BossCard>
  </div>
  
  <div>
    <BossCard theme="shadow" keyAction="🔑 核心要诀：切勿焦躁">
      <template #title>
        <DSTIcon icon="shadowmem" /> 荒尹沐
      </template>
      <ul>
        <li><strong>P1阶段</strong>：很弱，大号<code>猪人</code>水平。唯一要点就是吃了一次<DST icon="atk">冲刺</DST>后，切勿再左右走，不然容易吃<DST icon="shadowmem_minion">沐尹荒</DST>（影子）复刻的<DST icon="atk">冲刺</DST>。</li>
        <li><strong>P2阶段</strong>：注意观察周围，不惜一切代价打掉透明的<DST icon="stalker_minion">编织梦魇</DST>。否则你需要面对单独行动的<code>墨荒</code>。</li>
        <li><strong>清理影子？</strong>：让自己输出头部的时候没有其他<DST icon="shadowmem_minion">沐尹荒</DST>干扰是很有诱惑力，但切勿为了清干净<DST icon="shadowmem_minion">沐尹荒</DST>而放弃打到一半的头部，头部每秒都在回血。陷入清影子的泥潭会导致不知不觉补给见底。</li>
        <li><strong>不清理影子？</strong>：保持高移速，最好铺设<code>卵石路</code>，这会让你躲避笨重的的<DST icon="shadowmem_minion">沐尹荒</DST>和<DST icon="ghost_fire">鬼火</DST>攻击如鱼得水。</li>
      </ul>
      <template #tucao>
        <strong>补充</strong>：<DST icon="beast">兽化</DST>的高机动很适合对付笨重的<DST icon="shadowmem">荒尹沐</DST>和它的衍生物。
      </template>
    </BossCard>
  </div>
</div>