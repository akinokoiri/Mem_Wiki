export const SKILL_NODES = {
  "mem_skill_soul_fire_1": {
    "id": "mem_skill_soul_fire_1",
    "x": -103,
    "y": 115,
    "connects": [
      "mem_skill_soul_fire_2"
    ],
    "locks": [],
    "root": true,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_FIRE_1",
    "title": "灵魂实体专精一级",
    "desc": "跟随你的[友善的荒尹沐]发射的[鬼火]弹射次数变为6次，[友善的芒伊月]发射的[鬼火]伤害+3，\n[鬼火]每弹射一次，下一次弹射的飞行速度和索敌范围+10%；\n你的[鬼火]引爆[魂魄刻印]后，会给自身添加同等层数的[闪耀刻印]状态，持续10秒；\n[闪耀刻印]期间，[电锯轰鸣]不会因为时间流逝而损失层数",
    "icon": "mem_skill_soul_fire_1"
  },
  "mem_skill_soul_fire_2": {
    "id": "mem_skill_soul_fire_2",
    "x": -103,
    "y": 62,
    "connects": [
      "mem_skill_soul_fire_3"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_FIRE_2",
    "title": "灵魂实体专精二级",
    "desc": "你发射的[鬼火]现在可以在敌人之间弹射3次；\n[友善的荒尹沐]发射的[鬼火]弹射次数变为7次，[友善的芒伊月]发射的[鬼火]伤害+6；\n现在每层[闪耀刻印]额外提供 5% 的受击闪避概率，闪避后层数减半",
    "icon": "mem_skill_soul_fire_2"
  },
  "mem_skill_soul_fire_3": {
    "id": "mem_skill_soul_fire_3",
    "x": -103,
    "y": 10,
    "connects": [
      "mem_skill_soul_lock_3"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_FIRE_3",
    "title": "灵魂实体专精三级",
    "desc": "你发射的[鬼火]弹射次数变为6次；\n[友善的荒尹沐]发射的[鬼火]弹射次数变为8次，[友善的芒伊月]发射的[鬼火]伤害+9；\n现在[闪耀刻印]会额外在时间结束和层数溢出时，根据层数恢复你附加[魂魄刻印]时所消耗的灵魂值，\n溢出/消散时，若层数≥ 5/10，额外恢复 5%/10% [灵魂值]；若不存在[灵魂值系统]，则改为恢复少量生命值。",
    "icon": "mem_skill_soul_fire_3"
  },
  "mem_skill_soul_hand": {
    "id": "mem_skill_soul_hand",
    "x": -153,
    "y": 62,
    "connects": [
      "mem_skill_soul_melt"
    ],
    "locks": [],
    "root": true,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_HAND",
    "title": "顷刻炼化",
    "desc": "你空手命中敌人时，\n恢复造成伤害 3% 的灵魂值。\n此效果无法对墙、发条生物等无灵魂的生物生效",
    "icon": "mem_skill_soul_hand"
  },
  "mem_skill_soul_melt": {
    "id": "mem_skill_soul_melt",
    "x": -153,
    "y": 10,
    "connects": [
      "mem_skill_soul_lock_1"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_MELT",
    "title": "融魂术",
    "desc": "你击杀大体型生物(血量>150)死亡，\n其生命的3%会被吸收为灵魂。\n此效果无法对墙、发条生物等无灵魂的生效",
    "icon": "mem_skill_soul_melt"
  },
  "mem_skill_soul_rest_1": {
    "id": "mem_skill_soul_rest_1",
    "x": -51,
    "y": 62,
    "connects": [
      "mem_skill_soul_rest_2"
    ],
    "locks": [],
    "root": true,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_REST_1",
    "title": "休养死息一级",
    "desc": "你的生命值溢出的治疗量转化为灵魂的比例，\n从20%提升至35%",
    "icon": "mem_skill_soul_rest_1"
  },
  "mem_skill_soul_rest_2": {
    "id": "mem_skill_soul_rest_2",
    "x": -51,
    "y": 10,
    "connects": [
      "mem_skill_soul_lock_2",
      "mem_skill_body_lock_spirit"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_REST_2",
    "title": "休养死息二级",
    "desc": "你的生命值溢出的治疗量转化为灵魂的比例，\n提升至50%",
    "icon": "mem_skill_soul_rest_2"
  },
  "mem_skill_soul_lock_1": {
    "id": "mem_skill_soul_lock_1",
    "x": -153,
    "y": -34,
    "connects": [
      "mem_skill_soul_light"
    ],
    "locks": [],
    "root": false,
    "isLock": true,
    "stringKey": "MEM_SKILL_SOUL_LOCK_1",
    "title": "路径锁定",
    "desc": "前置要求：点亮[融魂术]\n【封印】你需要在黑暗中倾听危险的警告，逃回光照以积攒胆识。\n越是极限收益越高，但若被黑暗反噬受伤，你将会失去所有进度。",
    "icon": "mem_skill_soul_lock_1"
  },
  "mem_skill_soul_light": {
    "id": "mem_skill_soul_light",
    "x": -154,
    "y": -79,
    "connects": [],
    "locks": [
      "mem_skill_soul_lock_1"
    ],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_LIGHT",
    "title": "彼世的光芒",
    "desc": "由你或你的随从产生的[鬼火]或[魂魄刻印]可以提供照明效果",
    "icon": "mem_skill_soul_light"
  },
  "mem_skill_soul_lock_3": {
    "id": "mem_skill_soul_lock_3",
    "x": -102,
    "y": -34,
    "connects": [
      "mem_skill_soul_split"
    ],
    "locks": [],
    "root": false,
    "isLock": true,
    "stringKey": "MEM_SKILL_SOUL_LOCK_3",
    "title": "路径锁定",
    "desc": "前置要求：点亮[融魂术]、[灵魂实体专精三级]、[休养死息二级]中的任意两个\n【封印】你需要通过大量治疗溢出，让[灵魂池]在某一刻≥150点。",
    "icon": "mem_skill_soul_lock_3"
  },
  "mem_skill_soul_split": {
    "id": "mem_skill_soul_split",
    "x": -102,
    "y": -79,
    "connects": [],
    "locks": [
      "mem_skill_soul_lock_3"
    ],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_SPLIT",
    "title": "四象离魂",
    "desc": "你可以按 G （默认按键）使自身环绕4个可索敌改变轨道的[鬼火]；\n开启瞬间损失 40 点灵魂值和灵魂值上限，关闭返还 40 点灵魂值上限，主动关闭额外返还灵魂值；\n开启时每秒消耗 1 灵魂值，[鬼火]碰撞到目标后，自身会额外扣减 0.5 灵魂值，\n并造成 10 点伤害，减少其 10% 的移动速度（可叠加4次）",
    "icon": "mem_skill_soul_split"
  },
  "mem_skill_soul_lock_2": {
    "id": "mem_skill_soul_lock_2",
    "x": -51,
    "y": -34,
    "connects": [
      "mem_skill_soul_wall"
    ],
    "locks": [],
    "root": false,
    "isLock": true,
    "stringKey": "MEM_SKILL_SOUL_LOCK_2",
    "title": "路径锁定",
    "desc": "前置要求：点亮[休养死息二级]\n【封印】你需要承受一次幅度≥101%的[灵魂震荡]。\n只有让躯壳彻底体验过灵魂撕裂的痛苦，你才能学会如何构筑壁垒。",
    "icon": "mem_skill_soul_lock_2"
  },
  "mem_skill_soul_wall": {
    "id": "mem_skill_soul_wall",
    "x": -51,
    "y": -79,
    "connects": [],
    "locks": [
      "mem_skill_soul_lock_2"
    ],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_SOUL_WALL",
    "title": "魂墙",
    "desc": "你现在免疫因复活产生的[灵魂震荡]；\n免疫[怨灵状态]/[意识转移]产生的[暗影观察者]；\n能消耗 1 灵魂值制造一个脆弱但足以阻挡去路的半透明墙体",
    "icon": "mem_skill_soul_wall"
  },
  "mem_skill_instinct_teleport": {
    "id": "mem_skill_instinct_teleport",
    "x": 2,
    "y": -79,
    "connects": [],
    "locks": [],
    "root": true,
    "isLock": false,
    "stringKey": "MEM_SKILL_INSTINCT_TELEPORT",
    "title": "落叶归根",
    "desc": "你死后变成鬼魂时，可以打开地图\n右键点击自己的尸体、坟墓或住宅进行传送\n此外，死亡与复活时将不再受到[灵魂裂痕]惩罚",
    "icon": "mem_skill_instinct_teleport"
  },
  "mem_skill_body_lock_spirit": {
    "id": "mem_skill_body_lock_spirit",
    "x": 0,
    "y": 0,
    "connects": [
      "mem_spirit_link"
    ],
    "locks": [],
    "root": false,
    "isLock": true,
    "stringKey": "MEM_SKILL_BODY_LOCK_SPIRIT",
    "title": "路径锁定",
    "desc": "前置要求：点亮[休养死息二级]、[精准度优化一级]、[参点防腐剂一级]、[逐渐麻木一级]中的任意两个\n【封印】你需要在5秒内失去等同于你“当前”灵魂上限的灵魂值。\n体验濒临枯竭的绝境来激发潜能，或许……主动压低上限也是一种捷径？",
    "icon": "mem_skill_body_lock_spirit"
  },
  "mem_spirit_link": {
    "id": "mem_spirit_link",
    "x": 0,
    "y": 77,
    "connects": [],
    "locks": [
      "mem_skill_body_lock_spirit"
    ],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SPIRIT_LINK",
    "title": "魂魄逸散",
    "desc": "你现在可以对自己执行特殊的[分头行动]：[意识转移]；\n[分头行动]下的身体在遭受攻击后的 1 秒内，受到的伤害 -80%；\n每损失 30 点灵魂值，你的下一次攻击命中将向发射一颗[鬼火]",
    "icon": "mem_spirit_link"
  },
  "mem_skill_body_precision_1": {
    "id": "mem_skill_body_precision_1",
    "x": 52,
    "y": 77,
    "connects": [
      "mem_skill_body_precision_2",
      "mem_skill_body_lock_spirit"
    ],
    "locks": [],
    "root": true,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_PRECISION_1",
    "title": "精准度“优化”一级",
    "desc": "[兽化状态]下，你的采集、收获速度+20%；\n但爪子不适合精细工作，制作速度-10%",
    "icon": "mem_skill_body_precision_1"
  },
  "mem_skill_body_precision_2": {
    "id": "mem_skill_body_precision_2",
    "x": 100,
    "y": 77,
    "connects": [
      "mem_skill_body_precision_3"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_PRECISION_2",
    "title": "精准度“优化”二级",
    "desc": "[兽化状态]下，你的采集、收获速度+40%；\n制作速度-20%",
    "icon": "mem_skill_body_precision_2"
  },
  "mem_skill_body_precision_3": {
    "id": "mem_skill_body_precision_3",
    "x": 148,
    "y": 77,
    "connects": [
      "mem_skill_instinct_beastly"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_PRECISION_3",
    "title": "精准度“优化”三级",
    "desc": "[兽化状态]下，你的采集、收获速度+60%；\n制作速度-30%",
    "icon": "mem_skill_body_precision_3"
  },
  "mem_skill_body_preservative_1": {
    "id": "mem_skill_body_preservative_1",
    "x": 52,
    "y": 17,
    "connects": [
      "mem_skill_body_preservative_2",
      "mem_skill_body_lock_spirit"
    ],
    "locks": [],
    "root": true,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_PRESERVATIVE_1",
    "title": "参点防腐剂一级",
    "desc": "你身上的物品腐烂得[稍微慢一点]；\n尸体能存在更长时间",
    "icon": "mem_skill_body_preservative_1"
  },
  "mem_skill_body_preservative_2": {
    "id": "mem_skill_body_preservative_2",
    "x": 100,
    "y": 17,
    "connects": [
      "mem_skill_body_preservative_3"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_PRESERVATIVE_2",
    "title": "参点防腐剂二级",
    "desc": "你身上的物品腐烂得[更慢一些]；\n尸体能存在一周之久",
    "icon": "mem_skill_body_preservative_2"
  },
  "mem_skill_body_preservative_3": {
    "id": "mem_skill_body_preservative_3",
    "x": 148,
    "y": 17,
    "connects": [
      "mem_skill_instinct_ghostly"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_PRESERVATIVE_3",
    "title": "参点防腐剂三级",
    "desc": "你身上的物品相对来说[难以腐烂]（速率30%）；\n尸体能存在半个季节之久",
    "icon": "mem_skill_body_preservative_3"
  },
  "mem_skill_body_numb_1": {
    "id": "mem_skill_body_numb_1",
    "x": 52,
    "y": -47,
    "connects": [
      "mem_skill_body_numb_2",
      "mem_skill_body_lock_spirit"
    ],
    "locks": [],
    "root": true,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_NUMB_1",
    "title": "逐渐麻木一级",
    "desc": "你受到的所有持续性理智波动（包含环境与光环）降低 15%；\n你处于[怨灵状态]因理智值影响的最高攻击与承伤倍率提升至 1.65 倍",
    "icon": "mem_skill_body_numb_1"
  },
  "mem_skill_body_numb_2": {
    "id": "mem_skill_body_numb_2",
    "x": 100,
    "y": -47,
    "connects": [
      "mem_skill_body_numb_3"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_NUMB_2",
    "title": "逐渐麻木二级",
    "desc": "你受到的所有持续性理智波动（包含环境与光环）降低 30%；\n你处于[怨灵状态]因理智值影响的最高攻击与承伤倍率提升至 1.8 倍",
    "icon": "mem_skill_body_numb_2"
  },
  "mem_skill_body_numb_3": {
    "id": "mem_skill_body_numb_3",
    "x": 146,
    "y": -47,
    "connects": [
      "mem_skill_instinct_ghostly"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_NUMB_3",
    "title": "逐渐麻木三级",
    "desc": "你受到的所有持续性理智波动（包含环境与光环）降低 45%；\n你处于[怨灵状态]因理智值影响的最高攻击与承伤倍率提升至 1.95 倍",
    "icon": "mem_skill_body_numb_3"
  },
  "mem_skill_instinct_beastly": {
    "id": "mem_skill_instinct_beastly",
    "x": 196,
    "y": 37,
    "connects": [
      "mem_skill_body_lock_exp"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_INSTINCT_BEASTLY",
    "title": "野兽体质",
    "desc": "[兽化]时可空手工作（但效率仅有40%且工作时肚子会饿）；\n处于[兽化]且[分头行动]时可以指挥身体工作；\n[兽化]跳跃速度+40%（跳跃滞空的时间变得更短）；\n藏食物时刨的土坑的可维持的时间翻倍",
    "icon": "mem_skill_instinct_beastly"
  },
  "mem_skill_instinct_ghostly": {
    "id": "mem_skill_instinct_ghostly",
    "x": 196,
    "y": -14,
    "connects": [
      "mem_skill_body_lock_exp"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_INSTINCT_GHOSTLY",
    "title": "幽灵体质",
    "desc": "远处的敌人无法注意到你，身体只有一半情况下效果更甚；\n分头和接头瞬间可以让那些因你而生的暗影生物们以为你已经死了；\n击杀因你而生的暗影生物时，获得额外 50% 精神值恢复",
    "icon": "mem_skill_instinct_ghostly"
  },
  "mem_skill_body_lock_exp": {
    "id": "mem_skill_body_lock_exp",
    "x": 194,
    "y": -53,
    "connects": [
      "mem_explosive_body"
    ],
    "locks": [],
    "root": false,
    "isLock": true,
    "stringKey": "MEM_SKILL_BODY_LOCK_EXP",
    "title": "路径锁定",
    "desc": "前置要求：同时拥有[幽灵体质]与[野兽体质]\n【封印】你需要切身体验一次粉身碎骨的瞬间（因爆炸而死亡1次）。\n唯有直面毁灭的冲击，这具躯壳才能学会如何将残存的能量化作绚丽的余烬。",
    "icon": "mem_skill_body_lock_exp"
  },
  "mem_explosive_body": {
    "id": "mem_explosive_body",
    "x": 196,
    "y": -90,
    "connects": [],
    "locks": [
      "mem_skill_body_lock_exp"
    ],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_EXPLOSIVE_BODY",
    "title": "易燃易爆",
    "desc": "你就是艺术！\n你的尸体现在会爆炸；\n你可以把“肢体”投掷出去当摔炮使",
    "icon": "mem_explosive_body"
  },
  "mem_skill_body_medicine": {
    "id": "mem_skill_body_medicine",
    "x": 251,
    "y": 113,
    "connects": [],
    "locks": [
      "mem_skill_body_lock_medicine"
    ],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_BODY_MEDICINE",
    "title": "本源协调",
    "desc": "你和[友善的荒尹沐]的[鬼火]如果有弹射次数，那么将可以在友军和玩家之间弹射（不造成伤害）；\n[友善的芒伊月]的[近战模式]攻击后虚弱时间 -2 秒；同时，你的随从不再会因为阵营对立而互相攻击；\n你可以食用绝望石或者纯粹辉煌来让你和你的的随从加入对应阵营8分钟，\n以换取对同阵营的20%伤害减免和敌对阵营的伤害增加",
    "icon": "mem_skill_body_medicine"
  },
  "mem_skill_body_lock_medicine": {
    "id": "mem_skill_body_lock_medicine",
    "x": 251,
    "y": 73,
    "connects": [
      "mem_skill_body_medicine"
    ],
    "locks": [],
    "root": false,
    "isLock": true,
    "stringKey": "MEM_SKILL_BODY_LOCK_MEDICINE",
    "title": "路径锁定",
    "desc": "前置要求：点亮[隐藏本能二级]\n【封印】让10种不同的生灵折服于你并奉你为主。\n唯有深刻体悟不同躯壳的差异与共性，才能随心所欲地调配它们的本源。",
    "icon": "mem_skill_body_lock_medicine"
  },
  "mem_skill_instinct_hide_2": {
    "id": "mem_skill_instinct_hide_2",
    "x": 251,
    "y": 35,
    "connects": [
      "mem_skill_body_lock_medicine"
    ],
    "locks": [],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_SKILL_INSTINCT_HIDE_2",
    "title": "隐藏本能二级",
    "desc": "[兽化状态]下的你不会惊扰小动物；\n捕猎成功概率+20%；\n进入捕猎姿态后的移速+40%",
    "icon": "mem_skill_instinct_hide_2"
  },
  "mem_skill_instinct_hide_1": {
    "id": "mem_skill_instinct_hide_1",
    "x": 251,
    "y": -16,
    "connects": [
      "mem_skill_instinct_hide_2",
      "mem_skill_body_lock_corpse"
    ],
    "locks": [],
    "root": true,
    "isLock": false,
    "stringKey": "MEM_SKILL_INSTINCT_HIDE_1",
    "title": "隐藏本能一级",
    "desc": "[兽化状态]下的你不再被中立生物敌视；\n捕猎成功概率+10%；\n进入捕猎姿态后的移速+20%",
    "icon": "mem_skill_instinct_hide_1"
  },
  "mem_skill_body_lock_corpse": {
    "id": "mem_skill_body_lock_corpse",
    "x": 251,
    "y": -55,
    "connects": [
      "mem_corpse_mastery"
    ],
    "locks": [],
    "root": false,
    "isLock": true,
    "stringKey": "MEM_SKILL_BODY_LOCK_CORPSE",
    "title": "路径锁定",
    "desc": "前置要求：同时点亮[参点防腐剂三级]与[幽灵体质]或[野兽体质]与[幽灵体质]\n【封印】亲手缝制66种不同的随身装备，或让 6 种因为位面能量死而复生的生物彻底安息。\n借由不断编织外物与剖析复生者的躯壳，你终将参透重塑死体的奥秘。",
    "icon": "mem_skill_body_lock_corpse"
  },
  "mem_corpse_mastery": {
    "id": "mem_corpse_mastery",
    "x": 251,
    "y": -92,
    "connects": [],
    "locks": [
      "mem_skill_body_lock_corpse"
    ],
    "root": false,
    "isLock": false,
    "stringKey": "MEM_CORPSE_MASTERY",
    "title": "死体精通",
    "desc": "你可以给尸体复活而来的随从穿戴改变定位的[战术装备]了；\n你可以对坟墓或尸体、尸体复活而来的随从进行防腐改造了；\n防腐改造后撒盐能让它们存在的更久，获得的治疗效果更好",
    "icon": "mem_corpse_mastery"
  }
};
