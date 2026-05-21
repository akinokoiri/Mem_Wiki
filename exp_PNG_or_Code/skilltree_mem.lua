-- 重载命令（别忘了切换成本地！）：package.loaded["skilltree_mem"]=nil; local defs=require("prefabs/skilltree_defs"); defs.CreateSkillTreeFor("mem", require("skilltree_mem")(defs.FN).SKILLS); TheGlobalInstance:PushEvent("debug_rebuild_skilltreedata")

local function BuildSkillsData(SkillTreeFns)
    -- ===========================================================================
    -- 文本映射游标 (极简命名，提升代码可读性与性能)
    -- ===========================================================================
    -- 注意：STRINGS.MEM_SKILLS 会在接下来我们写 strings.lua 时全局注入
    local LANG = STRINGS.MEM_SKILLS or {}

    -- ===========================================================================
    -- 坐标网格系统 (深度校准版)
    -- ===========================================================================
    local X0, Y0 = -55, 125  -- 直角坐标系。前者左右 后者上下 前者减少往左，增加向右 后者减少向下，增加向上

    -- 辅助函数：快速计算网格坐标
    local function Pos(x_offset, y_offset)
        return { X0 + x_offset, Y0 + y_offset }
    end

    -- 动态封印文本生成器
    local function FormatLockDesc(base_req, seal_desc)
        local mode = (TUNING.MEM_CONFIG and TUNING.MEM_CONFIG.SKILL_CHALLENGE_MODE) or 1 
        if mode == 0 then
            return base_req or ""
        else
            return (base_req or "") .. STRINGS.INFO_MEM.UI.SEAL_PREFIX .. (seal_desc or "")
        end
    end

    local skills = {
        -- ===========================================================================
        -- A区：左侧灵魂脉络 (菱形 "M" 结构)
        -- ===========================================================================
        ['mem_skill_soul_fire_1'] = { -- A1 (顶点)
            title        = LANG.MEM_SKILL_SOUL_FIRE_1.TITLE,
            desc         = LANG.MEM_SKILL_SOUL_FIRE_1.DESC,
            pos          = Pos(-107, 115),
            defaultfocus = true,
            root         = true,
            -- 【核心逻辑】：通过赋数字值来记录技能等级，替代原本的 Tag
            onactivate   = function(inst) inst.mem_skill_level_fire = math.max(inst.mem_skill_level_fire or 0, 1) end,
            ondeactivate = function(inst) 
                inst.mem_skill_level_fire = 0
                for i = 3, 1, -1 do
                    if inst.components.skilltreeupdater:IsActivated("mem_skill_soul_fire_"..i) then
                        inst.mem_skill_level_fire = i
                        break
                    end
                end
            end,
            group        = "mem_all",
            tags         = { "skill" },
            -- 追加连接到 2 级技能
            connects     = { "mem_skill_soul_fire_2" },
        },
        ['mem_skill_soul_fire_2'] = { -- A1-2 (中轴线第二格)
            title        = LANG.MEM_SKILL_SOUL_FIRE_2.TITLE,
            desc         = LANG.MEM_SKILL_SOUL_FIRE_2.DESC,
            pos          = Pos(-107, 62), -- 对齐 rest_1 和 hand 的 Y 轴
            root         = false,
            onactivate   = function(inst) inst.mem_skill_level_fire = math.max(inst.mem_skill_level_fire or 0, 2) end,
            ondeactivate = function(inst) 
                inst.mem_skill_level_fire = 0
                for i = 3, 1, -1 do
                    if inst.components.skilltreeupdater:IsActivated("mem_skill_soul_fire_"..i) then
                        inst.mem_skill_level_fire = i
                        break
                    end
                end
            end,
            group        = "mem_all",
            tags         = { "skill" },
            connects     = { "mem_skill_soul_fire_3" },
        },
        ['mem_skill_soul_fire_3'] = { -- A1-3 (中轴线第三格)
            title        = LANG.MEM_SKILL_SOUL_FIRE_3.TITLE,
            desc         = LANG.MEM_SKILL_SOUL_FIRE_3.DESC,
            pos          = Pos(-107, 10), -- 对齐 rest_2 和 melt 的 Y 轴
            root         = false,
            onactivate   = function(inst) inst.mem_skill_level_fire = math.max(inst.mem_skill_level_fire or 0, 3) end,
            ondeactivate = function(inst) 
                inst.mem_skill_level_fire = 0
                for i = 3, 1, -1 do
                    if inst.components.skilltreeupdater:IsActivated("mem_skill_soul_fire_"..i) then
                        inst.mem_skill_level_fire = i
                        break
                    end
                end
            end,
            group        = "mem_all",
            tags         = { "skill" },
            -- 根据地理位置，向下引流连接到锁3
            connects     = { "mem_skill_soul_lock_3" },
        },
        ['mem_skill_soul_hand'] = { -- A3
            title        = LANG.MEM_SKILL_SOUL_HAND.TITLE,
            desc         = LANG.MEM_SKILL_SOUL_HAND.DESC,
            pos          = Pos(-158, 62),
            root         = true,
            onactivate   = function(inst) inst:AddTag("mem_skill_soul_hand") end,
            ondeactivate = function(inst) inst:RemoveTag("mem_skill_soul_hand") end,
            group        = "mem_all",
            tags         = { "skill" },
            connects     = { "mem_skill_soul_melt" },
        },
        ['mem_skill_soul_melt'] = { -- A5
            title        = LANG.MEM_SKILL_SOUL_MELT.TITLE,
            desc         = LANG.MEM_SKILL_SOUL_MELT.DESC,
            pos          = Pos(-158, 10),
            root         = false,
            onactivate   = function(inst) inst:AddTag("mem_skill_soul_melt") end,
            ondeactivate = function(inst) inst:RemoveTag("mem_skill_soul_melt") end,
            group        = "mem_all",
            tags         = { "skill" },
            connects     = { "mem_skill_soul_lock_1"},
        },
        ['mem_skill_soul_rest_1'] = { -- A2
            title        = LANG.MEM_SKILL_SOUL_REST_1.TITLE,
            desc         = LANG.MEM_SKILL_SOUL_REST_1.DESC,
            pos          = Pos(-55, 62),
            root         = true,
            onactivate   = function(inst) inst.mem_skill_level_rest = math.max(inst.mem_skill_level_rest or 0, 1) end,
            ondeactivate = function(inst) inst.mem_skill_level_rest = nil end,
            group        = "mem_all",
            tags         = { "skill" },
            connects     = { "mem_skill_soul_rest_2" },
        },
        ['mem_skill_soul_rest_2'] = { -- A4
            title        = LANG.MEM_SKILL_SOUL_REST_2.TITLE,
            desc         = LANG.MEM_SKILL_SOUL_REST_2.DESC,
            pos          = Pos(-55, 10),
            root         = false,
            onactivate   = function(inst) inst.mem_skill_level_rest = math.max(inst.mem_skill_level_rest or 0, 2) end,
            ondeactivate = function(inst) inst.mem_skill_level_rest = nil end,
            group        = "mem_all",
            tags         = { "skill" },
            connects     = { "mem_skill_soul_lock_2", "mem_skill_body_lock_spirit" },
        },
        
        -- 左侧第一列下沉
        ['mem_skill_soul_lock_1'] = { -- AL1
            desc         = FormatLockDesc(
                LANG.MEM_SKILL_SOUL_LOCK_1.LOCK_REQ, 
                LANG.MEM_SKILL_SOUL_LOCK_1.LOCK_DESC
            ),
            pos          = Pos(-159, -34),
            root         = false,
            group        = "mem_all",
            tags         = { "skill", "others", "lock" },
            lock_open    = function(prefabname, skillselection) 
                return skillselection and skillselection['mem_skill_soul_melt'] 
            end,
            connects     = { "mem_skill_soul_light" }, 
        },
        ['mem_skill_soul_light'] = { -- A6
            title        = LANG.MEM_SKILL_SOUL_LIGHT.TITLE,
            desc         = LANG.MEM_SKILL_SOUL_LIGHT.DESC,
            pos          = Pos(-158, -75),
            root         = false,
            group        = "mem_all",
            tags         = { "skill" }, 
            locks        = { "mem_skill_soul_lock_1" },
            onactivate   = function(inst) 
                inst:AddTag("mem_pending_soul_light")
                if TheWorld.ismastersim and inst.components.mem_skill_awakener then inst.components.mem_skill_awakener:EvaluateSkill("mem_skill_soul_light") end
                inst:PushEvent("mem_skill_update") 
            end,
            ondeactivate = function(inst) 
                inst:RemoveTag("mem_pending_soul_light") 
                inst:RemoveTag("mem_active_soul_light") 
                inst:PushEvent("mem_skill_update") 
            end,
        },
        
        -- 左侧第二列下沉
        ['mem_skill_soul_lock_3'] = { -- AL2
            desc         = FormatLockDesc(
                LANG.MEM_SKILL_SOUL_LOCK_3.LOCK_REQ,
                LANG.MEM_SKILL_SOUL_LOCK_3.LOCK_DESC
            ),
            pos          = Pos(-106, -34),
            root         = false,
            group        = "mem_all",
            tags         = { "skill", "others", "lock" },
            
            -- 【核心修改】：3 选 2 判定逻辑
            lock_open    = function(prefabname, skillselection) 
                if not skillselection then return false end
                local count = 0
                if skillselection['mem_skill_soul_fire_3'] then count = count + 1 end
                if skillselection['mem_skill_soul_rest_2'] then count = count + 1 end
                if skillselection['mem_skill_soul_melt'] then count = count + 1 end
                return count >= 2
            end,
            
            connects     = { "mem_skill_soul_split" },
        },
        ['mem_skill_soul_split'] = { -- A7
            title        = LANG.MEM_SKILL_SOUL_SPLIT.TITLE,
            desc         = LANG.MEM_SKILL_SOUL_SPLIT.DESC,
            pos          = Pos(-106, -75),
            root         = false,
            group        = "mem_all",
            tags         = { "skill" }, 
            locks        = { "mem_skill_soul_lock_3" },
            onactivate   = function(inst) 
                inst:AddTag("mem_pending_soul_split") 
                if TheWorld.ismastersim and inst.components.mem_skill_awakener then inst.components.mem_skill_awakener:EvaluateSkill("mem_skill_soul_split") end
            end,
            ondeactivate = function(inst) 
                inst:RemoveTag("mem_pending_soul_split") 
                inst:RemoveTag("mem_active_soul_split") 
            end,
        },

        -- 左侧第三列下沉
        ['mem_skill_soul_lock_2'] = { -- AL3
            desc         = FormatLockDesc(
                LANG.MEM_SKILL_SOUL_LOCK_2.LOCK_REQ,
                LANG.MEM_SKILL_SOUL_LOCK_2.LOCK_DESC
            ),
            pos          = Pos(-53, -34),
            root         = false,
            group        = "mem_all",
            tags         = { "skill", "others", "lock" },
            lock_open    = function(prefabname, skillselection) 
                return skillselection and skillselection['mem_skill_soul_rest_2'] 
            end,
            connects     = { "mem_skill_soul_wall" },
        },
        ['mem_skill_soul_wall'] = { -- A8
            title        = LANG.MEM_SKILL_SOUL_WALL.TITLE,
            desc         = LANG.MEM_SKILL_SOUL_WALL.DESC,
            pos          = Pos(-53, -75),
            root         = false,
            group        = "mem_all",
            tags         = { "skill" }, 
            locks        = { "mem_skill_soul_lock_2" },
            onactivate   = function(inst) 
                inst:AddTag("mem_pending_soul_wall")
                if TheWorld.ismastersim and inst.components.mem_skill_awakener then inst.components.mem_skill_awakener:EvaluateSkill("mem_skill_soul_wall") end
                inst:PushEvent("mem_skill_update") 
            end,
            ondeactivate = function(inst) 
                inst:RemoveTag("mem_pending_soul_wall") 
                inst:RemoveTag("mem_active_soul_wall")
                inst:PushEvent("mem_skill_update") 
            end,
        },
        ['mem_skill_instinct_teleport'] = { -- A9
            title        = LANG.MEM_SKILL_INSTINCT_TELEPORT.TITLE,
            desc         = LANG.MEM_SKILL_INSTINCT_TELEPORT.DESC,
            pos          = Pos(0, -75),
            root         = true,
            group        = "mem_all",
            tags         = { "skill" },
            onactivate   = function(inst) inst:AddTag("mem_teleport") end,
            ondeactivate = function(inst) inst:RemoveTag("mem_teleport") end,
        },

        -- ===========================================================================
        -- 中心枢纽 (BL1) 与 B区发散
        -- ===========================================================================
        ['mem_skill_body_lock_spirit'] = { -- BL1 (中心核心锁)
            desc         = FormatLockDesc(
                LANG.MEM_SKILL_BODY_LOCK_SPIRIT.LOCK_REQ,
                LANG.MEM_SKILL_BODY_LOCK_SPIRIT.LOCK_DESC
            ),
            pos          = Pos(0, 0),
            root         = false,
            group        = "mem_all",
            tags         = { "skill", "others", "lock" },
            -- lock_open    = function(prefabname, skillselection)
            --     return skillselection and skillselection['mem_skill_soul_rest_2'] and skillselection['mem_skill_body_precision_1'] and skillselection['mem_skill_body_preservative_1'] and skillselection['mem_skill_body_numb_1']
            -- end,
            lock_open    = function(prefabname, skillselection) 
                if not skillselection then return false end
                local count = 0
                if skillselection['mem_skill_soul_rest_2'] then count = count + 1 end
                if skillselection['mem_skill_body_precision_1'] then count = count + 1 end
                if skillselection['mem_skill_body_preservative_1'] then count = count + 1 end
                if skillselection['mem_skill_body_numb_1'] then count = count + 1 end
                return count >= 2
            end,
            connects     = { 'mem_spirit_link' },
        },
        ['mem_spirit_link'] = { -- B1 (上方孤点)
            title        = LANG.MEM_SPIRIT_LINK.TITLE,
            desc         = LANG.MEM_SPIRIT_LINK.DESC,
            pos          = Pos(0, 77),
            root         = false,
            group        = "mem_all",
            tags         = { "skill" },
            locks        = { "mem_skill_body_lock_spirit" },
            onactivate   = function(inst) 
                inst:AddTag("mem_pending_spirit_link") 
                if TheWorld.ismastersim and inst.components.mem_skill_awakener then inst.components.mem_skill_awakener:EvaluateSkill("mem_spirit_link") end
            end,
            ondeactivate = function(inst) 
                inst:RemoveTag("mem_pending_spirit_link") 
                inst:RemoveTag("mem_active_spirit_link") 
            end,
        },

        -- B之上路 (精准)
        ['mem_skill_body_precision_1'] = { -- B2
            title        = LANG.MEM_SKILL_BODY_PRECISION_1.TITLE,
            desc         = LANG.MEM_SKILL_BODY_PRECISION_1.DESC,
            pos          = Pos(52, 77),
            root         = true,
            group        = "mem_all",
            tags         = { "skill", 'quickpicker' },
            connects     = { "mem_skill_body_precision_2", "mem_skill_body_lock_spirit" },
            onactivate   = function(inst)
                inst:AddTag("mem_fastpicker")
                inst.mem_skill_level_precision = math.max(inst.mem_skill_level_precision or 0, 1)
            end,
            ondeactivate = function(inst)
                inst:RemoveTag("mem_fastpicker")
                inst.mem_skill_level_precision = nil
            end,
        },
        ['mem_skill_body_precision_2'] = { -- B3
            title        = LANG.MEM_SKILL_BODY_PRECISION_2.TITLE,
            desc         = LANG.MEM_SKILL_BODY_PRECISION_2.DESC,
            pos          = Pos(100, 77),
            root         = false,
            group        = "mem_all",
            tags         = { "skill", 'quickpicker' },
            connects     = { 'mem_skill_body_precision_3' },
            onactivate   = function(inst) inst.mem_skill_level_precision = math.max(inst.mem_skill_level_precision or 0, 2) end,
            ondeactivate = function(inst) inst.mem_skill_level_precision = nil end,
        },
        ['mem_skill_body_precision_3'] = { -- B4
            title        = LANG.MEM_SKILL_BODY_PRECISION_3.TITLE,
            desc         = LANG.MEM_SKILL_BODY_PRECISION_3.DESC,
            pos          = Pos(148, 77),
            root         = false,
            group        = "mem_all",
            tags         = { "skill", 'quickpicker' },
            connects     = { "mem_skill_instinct_beastly" },
            onactivate   = function(inst) inst.mem_skill_level_precision = math.max(inst.mem_skill_level_precision or 0, 3) end,
            ondeactivate = function(inst) inst.mem_skill_level_precision = nil end,
        },

        -- B之中路 (防腐)
        ['mem_skill_body_preservative_1'] = { -- B5
            title        = LANG.MEM_SKILL_BODY_PRESERVATIVE_1.TITLE,
            desc         = LANG.MEM_SKILL_BODY_PRESERVATIVE_1.DESC,
            pos          = Pos(52, 18), 
            root         = true,
            group        = "mem_all",
            tags         = { "skill" },
            connects     = { 'mem_skill_body_preservative_2', "mem_skill_body_lock_spirit" },
            onactivate   = function(inst) 
                inst.mem_skill_level_preservative = math.max(inst.mem_skill_level_preservative or 0, 1) 
                if inst.components.preserver then inst.components.preserver:SetPerishRateMultiplier(0.9) end
            end,
            ondeactivate = function(inst) 
                inst.mem_skill_level_preservative = nil 
                if inst.components.preserver then inst.components.preserver:SetPerishRateMultiplier(1) end
            end,
        },
        ['mem_skill_body_preservative_2'] = { -- B6
            title        = LANG.MEM_SKILL_BODY_PRESERVATIVE_2.TITLE,
            desc         = LANG.MEM_SKILL_BODY_PRESERVATIVE_2.DESC,
            pos          = Pos(100, 18),
            root         = false,
            group        = "mem_all",
            tags         = { "skill" },
            connects     = { 'mem_skill_body_preservative_3' },
            onactivate   = function(inst) 
                inst.mem_skill_level_preservative = math.max(inst.mem_skill_level_preservative or 0, 2) 
                if inst.components.preserver then inst.components.preserver:SetPerishRateMultiplier(0.8) end
            end,
            ondeactivate = function(inst) 
                inst.mem_skill_level_preservative = nil 
                if inst.components.preserver then inst.components.preserver:SetPerishRateMultiplier(1) end
            end,
        },
        ['mem_skill_body_preservative_3'] = { -- B7
            title        = LANG.MEM_SKILL_BODY_PRESERVATIVE_3.TITLE,
            desc         = LANG.MEM_SKILL_BODY_PRESERVATIVE_3.DESC,
            pos          = Pos(148, 18),
            root         = false,
            group        = "mem_all",
            tags         = { "skill" },
            connects     = { "mem_skill_instinct_ghostly" },
            onactivate   = function(inst) 
                inst.mem_skill_level_preservative = math.max(inst.mem_skill_level_preservative or 0, 3) 
                if inst.components.preserver then inst.components.preserver:SetPerishRateMultiplier(0.7) end
            end,
            ondeactivate = function(inst) 
                inst.mem_skill_level_preservative = nil 
                if inst.components.preserver then inst.components.preserver:SetPerishRateMultiplier(1) end
            end,
        },

        -- B之下路 (麻木)
        ['mem_skill_body_numb_1'] = { -- B8
            title        = LANG.MEM_SKILL_BODY_NUMB_1.TITLE,
            desc         = LANG.MEM_SKILL_BODY_NUMB_1.DESC,
            pos          = Pos(52, -44),
            root         = true,
            group        = "mem_all",
            tags         = { "skill" },
            connects     = { 'mem_skill_body_numb_2', 'mem_skill_body_lock_spirit' },
            onactivate   = function(inst) 
                inst.mem_skill_level_numb = math.max(inst.mem_skill_level_numb or 0, 1) 
                if inst.MEM_UpdateState then inst:MEM_UpdateState() end -- [新增] 刷新状态
            end,
            ondeactivate = function(inst) 
                inst.mem_skill_level_numb = nil 
                if inst.MEM_UpdateState then inst:MEM_UpdateState() end -- [新增] 刷新状态
            end,
        },
        ['mem_skill_body_numb_2'] = { -- B9
            title        = LANG.MEM_SKILL_BODY_NUMB_2.TITLE,
            desc         = LANG.MEM_SKILL_BODY_NUMB_2.DESC,
            pos          = Pos(100, -44),
            root         = false,
            group        = "mem_all",
            tags         = { "skill" },
            connects     = { 'mem_skill_body_numb_3' },
            onactivate   = function(inst) 
                inst.mem_skill_level_numb = math.max(inst.mem_skill_level_numb or 0, 2)
                if inst.MEM_UpdateState then inst:MEM_UpdateState() end -- [新增] 刷新状态
            end,
            ondeactivate = function(inst) 
                inst.mem_skill_level_numb = nil 
                if inst.MEM_UpdateState then inst:MEM_UpdateState() end -- [新增] 刷新状态
            end,
        },
        ['mem_skill_body_numb_3'] = { -- B10
            title        = LANG.MEM_SKILL_BODY_NUMB_3.TITLE,
            desc         = LANG.MEM_SKILL_BODY_NUMB_3.DESC,
            pos          = Pos(148, -44),
            root         = false,
            group        = "mem_all",
            tags         = { "skill" },
            connects     = { "mem_skill_instinct_ghostly" },
            onactivate   = function(inst) 
                inst.mem_skill_level_numb = math.max(inst.mem_skill_level_numb or 0, 3)
                if inst.MEM_UpdateState then inst:MEM_UpdateState() end -- [新增] 刷新状态
            end,
            ondeactivate = function(inst) 
                inst.mem_skill_level_numb = nil 
                if inst.MEM_UpdateState then inst:MEM_UpdateState() end -- [新增] 刷新状态
            end,
        },

        -- ===========================================================================
        -- C区右中汇聚 (本能)
        -- ===========================================================================
        ['mem_skill_instinct_beastly'] = { -- C1
            title        = LANG.MEM_SKILL_INSTINCT_BEASTLY.TITLE,
            desc         = LANG.MEM_SKILL_INSTINCT_BEASTLY.DESC,
            pos          = Pos(203, 37),
            root         = false,
            group        = "mem_all",
            tags         = { "skill" },
            connects     = { "mem_skill_body_lock_exp" },
            onactivate   = function(inst) 
                inst:AddTag("mem_skill_instinct_beastly") 
                if inst.MEM_UpdateState then inst:MEM_UpdateState() end
            end,
            ondeactivate = function(inst) 
                inst:RemoveTag("mem_skill_instinct_beastly") 
                if inst.MEM_UpdateState then inst:MEM_UpdateState() end
            end,
        },
        ['mem_skill_instinct_ghostly'] = { -- C2
            title        = LANG.MEM_SKILL_INSTINCT_GHOSTLY.TITLE,
            desc         = LANG.MEM_SKILL_INSTINCT_GHOSTLY.DESC,
            pos          = Pos(203, -14),
            root         = false,
            group        = "mem_all",
            tags         = { "skill" },
            connects     = { "mem_skill_body_lock_exp" },
            onactivate   = function(inst) inst:AddTag("mem_skill_instinct_ghostly") end,
            ondeactivate = function(inst) inst:RemoveTag("mem_skill_instinct_ghostly") end,
        },
        ['mem_skill_body_lock_exp'] = { -- CL1
            desc         = FormatLockDesc(
                LANG.MEM_SKILL_BODY_LOCK_EXP.LOCK_REQ,
                LANG.MEM_SKILL_BODY_LOCK_EXP.LOCK_DESC
            ),
            pos          = Pos(203, -53), 
            root         = false,
            group        = "mem_all",
            tags         = { "skill", "lock", "others" },
            lock_open    = function(prefabname, skillselection)
                return skillselection and skillselection['mem_skill_instinct_beastly'] and skillselection['mem_skill_instinct_ghostly']
            end,
            connects     = { "mem_explosive_body" },
        },
        ['mem_explosive_body'] = { -- C3
            title        = LANG.MEM_EXPLOSIVE_BODY.TITLE,
            desc         = LANG.MEM_EXPLOSIVE_BODY.DESC,
            pos          = Pos(203, -90),
            root         = false,
            group        = "mem_all",
            tags         = { "skill" },
            locks        = { "mem_skill_body_lock_exp" },
            onactivate   = function(inst) 
                inst:AddTag("mem_pending_explosive_body")
                if TheWorld.ismastersim and inst.components.mem_skill_awakener then 
                    inst.components.mem_skill_awakener:EvaluateSkill("mem_explosive_body") 
                end
            end,
            ondeactivate = function(inst) 
                inst:RemoveTag("mem_pending_explosive_body") 
                inst:RemoveTag("mem_explosive_body") 
            end,
        },

        -- ===========================================================================
        -- C区极右独立贯穿线
        -- ===========================================================================
        ['mem_skill_body_medicine'] = { -- C4 (顶部)
            title        = LANG.MEM_SKILL_BODY_MEDICINE.TITLE,
            desc         = LANG.MEM_SKILL_BODY_MEDICINE.DESC,
            pos          = Pos(260, 115), 
            root         = false,
            group        = "mem_all",
            tags         = { "skill" },
            locks        = { "mem_skill_body_lock_medicine" }, 
            onactivate   = function(inst)
                inst:AddTag("mem_pending_body_medicine")
                if TheWorld.ismastersim and inst.components.mem_skill_awakener then inst.components.mem_skill_awakener:EvaluateSkill("mem_skill_body_medicine") end
            end,
            ondeactivate = function(inst)
                inst:RemoveTag("mem_pending_body_medicine")
                inst:RemoveTag("mem_active_body_medicine")
                inst:RemoveTag(FOODTYPE['memxy'] .. "_eater")
                inst:RemoveTag("mem_skill_body_medicine")
            end,
        },
        ['mem_skill_body_lock_medicine'] = { -- CL2
            desc         = FormatLockDesc(
                LANG.MEM_SKILL_BODY_LOCK_MEDICINE.LOCK_REQ,
                LANG.MEM_SKILL_BODY_LOCK_MEDICINE.LOCK_DESC
            ),
            pos          = Pos(260, 75), 
            root         = false,
            group        = "mem_all",
            tags         = { "skill", "others", "lock" },
            lock_open    = function(prefabname, skillselection) 
                return skillselection and skillselection['mem_skill_instinct_hide_2'] 
            end,
            connects     = { 'mem_skill_body_medicine' },
        },
        ['mem_skill_instinct_hide_2'] = { -- C5
            title        = LANG.MEM_SKILL_INSTINCT_HIDE_2.TITLE,
            desc         = LANG.MEM_SKILL_INSTINCT_HIDE_2.DESC,
            pos          = Pos(260, 37),
            root         = false,
            group        = "mem_all",
            tags         = { "skill" },
            connects     = { "mem_skill_body_lock_medicine" },
            onactivate   = function(inst)
                inst.mem_skill_level_hide = math.max(inst.mem_skill_level_hide or 0, 2)
                inst:PushEvent("mem_skill_update") 
            end,
            ondeactivate = function(inst) 
                inst.mem_skill_level_hide = nil 
                inst:PushEvent("mem_skill_update")
            end,
        },
        ['mem_skill_instinct_hide_1'] = { -- C6 (独立线的起点)
            title        = LANG.MEM_SKILL_INSTINCT_HIDE_1.TITLE,
            desc         = LANG.MEM_SKILL_INSTINCT_HIDE_1.DESC,
            pos          = Pos(260, -14),
            root         = true,
            group        = "mem_all",
            tags         = { "skill" },
            connects     = { 'mem_skill_instinct_hide_2', 'mem_skill_body_lock_corpse' }, 
            onactivate   = function(inst)
                inst.mem_skill_level_hide = math.max(inst.mem_skill_level_hide or 0, 1)
                inst:PushEvent("mem_skill_update")
            end,
            ondeactivate = function(inst) 
                inst.mem_skill_level_hide = nil 
                inst:PushEvent("mem_skill_update")
            end,
        },
        ['mem_skill_body_lock_corpse'] = { -- CL3
            desc         = FormatLockDesc(
                LANG.MEM_SKILL_BODY_LOCK_CORPSE.LOCK_REQ,
                LANG.MEM_SKILL_BODY_LOCK_CORPSE.LOCK_DESC
            ),
            pos          = Pos(260, -53),
            root         = false, 
            group        = "mem_all",
            tags         = { "skill", "others", "lock" },
            lock_open    = function(prefabname, skillselection)
                return skillselection and skillselection['mem_skill_instinct_ghostly'] and (skillselection['mem_skill_body_preservative_3'] or skillselection['mem_skill_instinct_beastly'])
            end,
            connects     = { 'mem_corpse_mastery' },
        },
        ['mem_corpse_mastery'] = { -- C7 (底部)
            title        = LANG.MEM_CORPSE_MASTERY.TITLE,
            desc         = LANG.MEM_CORPSE_MASTERY.DESC,
            pos          = Pos(260, -90),
            root         = false,
            group        = "mem_all",
            tags         = { "skill" },
            locks        = { "mem_skill_body_lock_corpse" },
            onactivate   = function(inst) 
                inst:AddTag("mem_pending_corpse_mastery")
                if TheWorld.ismastersim and inst.components.mem_skill_awakener then inst.components.mem_skill_awakener:EvaluateSkill("mem_corpse_mastery") end
            end,
            ondeactivate = function(inst) 
                inst:RemoveTag("mem_pending_corpse_mastery") 
                inst:RemoveTag("mem_active_corpse_mastery") 
            end,
        },
    }

    return {
        SKILLS = skills,
        ORDERS = {
            { "mem_all", { 0, 175 } },
        },
    }
end

return BuildSkillsData