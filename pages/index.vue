<template>
    <q-layout view="hHh lpR fFf">

        <q-header elevated class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                    </q-avatar>
                    Mon mini crm
                </q-toolbar-title>

                <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
            </q-toolbar>

            <q-tabs align="left">
                <q-route-tab to="/pageProspect" label="Prospects" />
                <q-route-tab to="/pageUtilisateurs" label="Utilisateurs" />
                <q-route-tab to="/pageContacts" label="Contacts" />
            </q-tabs>
        </q-header>

        <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
            <!-- drawer content -->
            <LayoutOrganization :organizationData="organizationData" />
        </q-drawer>


        <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
            <!-- drawer content -->


            <LayoutReminder :appUserData="appUserData" />
        </q-drawer>

        <q-page-container>
            <q-row class="q-pa-md" justify="center">
                <q-col cols="12" sm="6">
                    <q-form class="q-px-sm q-pt-xl q-pb-lg" @submit="submitForm">
                        <q-input square clearable v-model="form.email" type="email" label="Email">
                            <template v-slot:prepend>
                                <q-icon name="email" />
                            </template>
                        </q-input>

                        <q-input square clearable v-model="form.password" type="password" label="Password">
                            <template v-slot:prepend>
                                <q-icon name="lock" />
                            </template>
                        </q-input>

                        <!-- Ajouter un bouton submit -->
                        <q-btn label="Submit" type="submit" color="primary" />

                        <!-- Ajouter un bouton inscription -->
                        <q-btn label="Inscription" color="secondary" @click="goToRegistration" />
                    </q-form>
                </q-col>

            </q-row>
            <router-view />
        </q-page-container>

        <q-footer elevated class="bg-grey-8 text-white">
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                    </q-avatar>
                    <div>Mon mini crm</div>
                </q-toolbar-title>
            </q-toolbar>
        </q-footer>

    </q-layout>
</template>

<script>

</script>
<script>
import { reactive } from 'vue';
import { useAuthStore } from '~/store/authStore';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const form = reactive({
      email: '',
      password: '',
    });

    const authStore = useAuthStore();
    const router = useRouter();

    const submitForm = async () => {
      try {
        console.log('Email:', form.email);
    console.log('Password:', form.password);
        await authStore.login(form.email, form.password);
      } catch (error) {
        console.error(error);
      }
    };

    return {
      form,
      submitForm,
    };
  },
};
</script>